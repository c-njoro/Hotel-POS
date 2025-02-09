const express = require("express");
const router = express.Router();
const {
  createMessage,
  getAllMessages,
  markOpened,
} = require("../controllers/message.controller");

router.post("/create", createMessage);
router.get("/", getAllMessages);
router.put("/markOpened/:id", markOpened);

module.exports = router;
