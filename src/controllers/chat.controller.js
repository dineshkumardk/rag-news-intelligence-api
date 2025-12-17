const { pool } = require("../db/postgres");
const { generateEmbedding } = require("../services/embedding.service");
const { client, COLLECTION } = require("../services/vector.service");
const { generateAnswer } = require("../services/llm.service");
const {
  getChatHistory,
  saveChatHistory
} = require("../services/chatMemory.service");

async function chat(req, res) {
  const start = Date.now();

  try {
    // ✅ Defensive check (IMPORTANT)
    if (!req.body) {
      return res.status(400).json({
        message: "Request body missing. Send JSON with sessionId and query."
      });
    }

    const { sessionId, query } = req.body;

    if (!sessionId || !query) {
      return res.status(400).json({
        message: "sessionId and query are required"
      });
    }

    // 1️⃣ Get chat history from Redis
    const history = await getChatHistory(sessionId);

    // 2️⃣ Generate query embedding
    let queryEmbedding = await generateEmbedding(query);
    queryEmbedding = queryEmbedding.slice(0, 384);

    // 3️⃣ Vector search in Qdrant
    const searchResults = await client.search(COLLECTION, {
      vector: queryEmbedding,
      limit: 3
    });

    const context = searchResults
      .map(r => r.payload?.content || "")
      .join("\n");

    // 4️⃣ Generate LLM answer
    const answer = await generateAnswer(context, query);

    // 5️⃣ Save conversation to Redis
    history.push({ query, answer });
    await saveChatHistory(sessionId, history);

    // 6️⃣ Log interaction to PostgreSQL
    const responseTime = Date.now() - start;
    await pool.query(
      `INSERT INTO interaction_logs
       (session_id, user_query, llm_response, response_time_ms)
       VALUES ($1, $2, $3, $4)`,
      [sessionId, query, answer, responseTime]
    );

    return res.json({ answer });

  } catch (error) {
    console.error("Chat error:", error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
}

module.exports = { chat };