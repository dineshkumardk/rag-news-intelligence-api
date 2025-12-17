const express = require("express");
const router = express.Router();

const {
  getHistory,
  deleteHistory
} = require("../controllers/history.controller");

router.get("/:sessionId", getHistory);
router.delete("/:sessionId", deleteHistory);

module.exports = router;