const {
  getChatHistory,
  clearChatHistory
} = require("../services/chatMemory.service");

// GET /history/:sessionId
async function getHistory(req, res) {
  try {
    const { sessionId } = req.params;

    if (!sessionId) {
      return res.status(400).json({ message: "sessionId is required" });
    }

    const history = await getChatHistory(sessionId);
    return res.json({ sessionId, history });

  } catch (error) {
    console.error("Get history error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// DELETE /history/:sessionId
async function deleteHistory(req, res) {
  try {
    const { sessionId } = req.params;

    if (!sessionId) {
      return res.status(400).json({ message: "sessionId is required" });
    }

    await clearChatHistory(sessionId);
    return res.json({ message: "Chat history cleared" });

  } catch (error) {
    console.error("Delete history error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  getHistory,
  deleteHistory
};