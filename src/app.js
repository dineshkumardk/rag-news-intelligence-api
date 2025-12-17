const express = require("express");
const cors = require("cors");

const ingestRoutes = require("./routes/ingest.routes");
const chatRoutes = require("./routes/chat.routes");
const historyRoutes = require("./routes/history.routes"); 

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.use("/ingest", ingestRoutes);
app.use("/chat", chatRoutes);
app.use("/history", historyRoutes);

module.exports = app;