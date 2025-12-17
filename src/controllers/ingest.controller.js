const { ingestNews } = require("../services/ingestion.service");

async function ingest(req, res) {
  try {
    const count = await ingestNews();

    return res.json({
      message: "Ingestion completed",
      documentsProcessed: count
    });
  } catch (error) {
    console.error("Ingest error:", error);
    return res.status(500).json({
      message: "Ingestion failed"
    });
  }
}

module.exports = { ingest };