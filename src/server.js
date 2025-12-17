require("dotenv").config();
const app = require("./app");
const { initDB } = require("./db/postgres");
const { initVectorDB } = require("./services/vector.service");

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await initDB();         
    await initVectorDB();     

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server startup failed:", error.message);
    process.exit(1);
  }
}

startServer();