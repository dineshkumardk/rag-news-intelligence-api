const redis = require("redis");

const client = redis.createClient({
  url: process.env.REDIS_URL || "redis://redis:6379"
});

client.on("error", (err) => console.error("Redis error", err));

(async () => {
  if (!client.isOpen) {
    await client.connect();
  }
})();

async function getChatHistory(sessionId) {
  const data = await client.get(sessionId);
  return data ? JSON.parse(data) : [];
}

async function saveChatHistory(sessionId, history) {
  await client.set(sessionId, JSON.stringify(history), {
    EX: 3600 // 1 hour TTL
  });
}

async function clearChatHistory(sessionId) {
  await client.del(sessionId);
}

module.exports = {
  getChatHistory,
  saveChatHistory,
  clearChatHistory
};