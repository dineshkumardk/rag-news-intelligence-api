const router = require("express").Router();
const { ingest } = require("../controllers/ingest.controller");

router.post("/", ingest);

module.exports = router;