const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});

async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS interaction_logs (
      id SERIAL PRIMARY KEY,
      session_id VARCHAR(100),
      user_query TEXT,
      llm_response TEXT,
      response_time_ms INT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log("PostgreSQL table ready");
}

module.exports = { pool, initDB };