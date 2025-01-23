const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config({ path: "./backend/.env" });
const axios = require("axios");
const Message = require("./models/message.model");

const dishRouter = require("./routes/dish.route");
const orderRouter = require("./routes/order.route");
const userRouter = require("./routes/user.route");
const messageRouter = require("./routes/message.route");
const stockRouter = require("./routes/stock.route");

//these are for setting up server for real time message sharing
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    exposedHeaders: ["Content-Range"],
  })
);
app.use(cors());
app.use(express.urlencoded({ extended: false }));

//routers of models
app.use("/api/dishes", dishRouter);
app.use("/api/orders", orderRouter);
app.use("/api/users", userRouter);
app.use("/api/messages", messageRouter);
app.use("/api/stock", stockRouter);

// //function handling socket io AN MESSAGING IN ALL
// io.on("connection", (socket) => {
//   console.log("Client connected: ", socket.id);
//   socket.on("newMessage", async (message) => {
//     console.log("The send message was received");
//     socket.emit("receivedMessage", message);
//     console.log("emitted receivedMessage");
//   });

//   socket.on("disconnect", () => {
//     console.log("Client disconnected:", socket.id);
//   });
// });

// module.exports = io;

mongoose
  .connect(`${process.env.LOCAL_KEY}`, {})
  .then(() => {
    console.log("connected to database");
    const port = process.env.PORT || 3000;
    httpServer.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(() => {
    console.log("Error while connecting to database!!!");
  });
