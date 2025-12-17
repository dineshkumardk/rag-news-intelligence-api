const { ingestNews } = require("../services/ingestion.service");

async function ingest(req, res) {
  const count = await ingestNews();
  res.json({
    message: "Ingestion completed",
    documentsProcessed: count
  });
}

module.exports = { ingest };