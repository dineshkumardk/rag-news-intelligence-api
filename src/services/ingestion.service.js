const news = require("../data/news.json");
const { generateEmbedding } = require("./embedding.service");
const { client, COLLECTION } = require("./vector.service");

async function ingestNews() {
  for (const article of news) {
    let embedding = await generateEmbedding(article.content);

    // Ensure vector size is EXACTLY 384
    if (embedding.length !== 384) {
      embedding = embedding.slice(0, 384);
      while (embedding.length < 384) {
        embedding.push(0);
      }
    }

    await client.upsert(COLLECTION, {
      points: [
        {
          id: Number(article.id), // 🔑 MUST be number
          vector: embedding,
          payload: {
            title: article.title,
            content: article.content,
            source: article.source
          }
        }
      ]
    });
  }

  return news.length;
}

module.exports = { ingestNews };