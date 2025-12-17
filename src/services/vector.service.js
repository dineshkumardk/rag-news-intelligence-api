const { QdrantClient } = require("@qdrant/js-client-rest");

const client = new QdrantClient({
  url: process.env.QDRANT_URL
});

const COLLECTION = "news_articles";
const VECTOR_SIZE = 384;

async function initVectorDB() {
  const collections = await client.getCollections();
  const exists = collections.collections.find(
    (c) => c.name === COLLECTION
  );

  if (!exists) {
    await client.createCollection(COLLECTION, {
      vectors: {
        size: VECTOR_SIZE,
        distance: "Cosine"
      }
    });

    console.log("Qdrant collection created");
  } else {
    console.log("Qdrant collection already exists");
  }
}

module.exports = {
  client,
  COLLECTION,
  initVectorDB
};