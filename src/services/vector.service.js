const { QdrantClient } = require("@qdrant/js-client-rest");

const QDRANT_URL = process.env.QDRANT_URL;
const COLLECTION = "news_articles";

let client = null;

async function initVectorDB() {
  if (!QDRANT_URL) {
    console.warn("⚠️ QDRANT_URL not set. Vector DB disabled (cloud mode)");
    return;
  }

  try {
    client = new QdrantClient({ url: QDRANT_URL });

    const collections = await client.getCollections();
    const exists = collections.collections.some(
      (c) => c.name === COLLECTION
    );

    if (!exists) {
      await client.createCollection(COLLECTION, {
        vectors: { size: 384, distance: "Cosine" }
      });
      console.log("✅ Qdrant collection created");
    } else {
      console.log("✅ Qdrant collection exists");
    }
  } catch (error) {
    console.error("❌ Qdrant initialization failed:", error.message);
    client = null; 
  }
}

function getClient() {
  return client;
}

module.exports = {
  initVectorDB,
  getClient,
  COLLECTION
};