const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Dish = require("../models/dish.model");
const User = require("../models/user.model");

const orderSchema = new Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
    default: () => new mongoose.Types.ObjectId().toString(),
  },
  orderStatus: {
    type: String,
    enum: ["preparing", "ready", "served"],
    default: "preparing",
  },

  table: {
    type: String,
    required: true,
  },

  paymentStatus: {
    type: String,
    enum: ["paid", "pending"],
    default: "pending",
  },

  totalAmount: { type: Number, required: true },

  dishes: [
    {
      dishId: {
        type: Schema.Types.ObjectId,
        ref: "Dish",
        required: true,
      },
      dishName: { type: String, required: true },
      quantity: { type: Number, required: true },
      unitPrice: { type: Number, required: true },
      totalPrice: { type: Number, required: true },
    },
  ],

  waiter: {
    waiterId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: {
      type: String,
      required: true,
    },
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
