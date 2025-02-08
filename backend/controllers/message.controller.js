const Message = require("../models/message.model");
const io = require("../index");

//creating a message
const sendMessage = async (req, res) => {
  try {
    const newMessage = await Message.create(req.body);

    //emit the message to every user in connection
    io.emit("receiveMessage", newMessage);

    res.status(201).json(newMessage);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Could not create new message : " + error.message });
  }
};

//retrieving messages WITH PARAMETERS
const getMessages = async (req, res) => {
  const { sender, receiver } = req.params;

  if (!sender || !receiver) {
    return res
      .status(400)
      .json({ message: "Either receiver or sender is missing in the request" });
  }

  try {
    const messages = await Message.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Could not fetch messages : " + error.message });
  }
};

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

module.exports = {
  sendMessage,
  getMessages,
  createMessage,
  getAllMessages,
};
