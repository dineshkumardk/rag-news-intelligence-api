const crypto = require("crypto");
const { generateEmbedding } = require("./embedding.service");
const { getClient, COLLECTION } = require("./vector.service");

// Mock news data
const newsArticles = [
  {
    title: "AI regulations",
    content: "Governments are introducing new regulations to control AI usage."
  },
  {
    title: "AI in healthcare",
    content: "Researchers developed AI systems that diagnose diseases faster."
  },
  {
    title: "Stock markets",
    content: "Global markets rallied after central banks hinted rate slowdowns."
  }
];

async function ingestNews() {
  const client = getClient();

  // ✅ Cloud-safe: skip if vector DB unavailable
  if (!client) {
    console.warn("⚠️ Vector DB unavailable. Skipping ingestion.");
    return 0;
  }

  let count = 0;

  for (const article of newsArticles) {
    const embedding = await generateEmbedding(article.content);

    await client.upsert(COLLECTION, {
      points: [
        {
          id: crypto.randomUUID(), // ✅ Node 18 built-in UUID
          vector: embedding.slice(0, 384),
          payload: {
            title: article.title,
            content: article.content
          }
        }
      ]
    });

    count++;
  }

  return count;
}

module.exports = { ingestNews };