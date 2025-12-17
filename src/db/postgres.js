const { Pool } = require("pg");

if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL is missing");
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS interaction_logs (
      id SERIAL PRIMARY KEY,
      session_id TEXT,
      user_query TEXT,
      llm_response TEXT,
      response_time_ms INT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log("✅ PostgreSQL table ready");
}

module.exports = { pool, initDB };