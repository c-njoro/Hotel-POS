const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config({ path: "./backend/.env" });

const dishRouter = require("./routes/dish.route");
const orderRouter = require("./routes/order.route");
const userRouter = require("./routes/user.route");

const app = express();

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

mongoose
  .connect(`${process.env.LOCAL_KEY}`)
  .then(() => {
    console.log("connected to database");
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(() => {
    console.log("Error while connecting to database!!!");
  });
