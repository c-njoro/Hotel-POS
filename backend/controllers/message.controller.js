const Message = require("../models/message.model");
const io = require("../index");

// Create a new message and emit it to the receiver
const createMessage = async (req, res) => {
  try {
    const { sender, receiver, text } = req.body;

    if (!sender || !receiver || !text) {
      return res
        .status(400)
        .json({ message: "Incomplete data to create a message" });
    }

    // Save the message in the database
    const newMessage = await Message.create(req.body);

    res.status(200).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//getting all messages
const getAllMessages = async (req, res) => {
  try {
    const { receiver, sender } = req.query;
    const query = {};

    if (receiver) {
      query.receiver = receiver; // checks if the passed cuisine is in the array
    }

    if (sender) {
      query.sender = sender; // checks if the passed cuisine is in the array
    }
    const allMessages = await Message.find(query).sort({ timestamp: -1 });
    res.status(200).json(allMessages);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch all messages: ", error });
  }
};

//update a message
const markOpened = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(405).json({ message: "Id was not provided" });
    }
    const openedMessage = await Message.findByIdAndUpdate(id, { opened: true });
    if (!openedMessage) {
      res.status(404).json({ message: "Message could not be found" });
    }

    res.status(200).json({ message: "message marked as opened" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Could not mark message as opened", error });
  }
};

module.exports = {
  createMessage,
  getAllMessages,
  markOpened,
};
