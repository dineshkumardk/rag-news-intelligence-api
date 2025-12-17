const axios = require("axios");

// Simple local embedding simulation (for now)
async function generateEmbedding(text) {
  // Dummy vector (384 length) to keep pipeline working
  return Array(384).fill(0).map(() => Math.random());
}

module.exports = { generateEmbedding };