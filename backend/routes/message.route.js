const express = require("express");
const router = express.Router();
const {
  sendMessage,
  getMessages,
  createMessage,
  getAllMessages,
} = require("../controllers/message.controller");

router.post("/send", sendMessage);

router.get("/obtain/between/:sender/:receiver", getMessages);

router.post("/create", createMessage);
router.get("/", getAllMessages);

module.exports = router;
