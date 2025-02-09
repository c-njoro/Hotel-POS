const express = require("express");
const router = express.Router();
const {
  createMessage,
  getAllMessages,
  markOpened,
  deleteMessage,
} = require("../controllers/message.controller");

router.post("/create", createMessage);
router.get("/", getAllMessages);
router.put("/markOpened/:id", markOpened);
router.delete("/delete/:id", deleteMessage);

module.exports = router;
