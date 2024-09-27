const express = require("express");
const router = express.Router();
const Order = require("../models/order.model");
const {
  createOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
  getOne,
} = require("../controllers/order.controller");

//getting all
router.get("/", getAllOrders);

//create dish
router.post("/create", createOrder);

//update dish
router.put("/update/:id", updateOrder);

//delete a dish
router.delete("/delete/:id", deleteOrder);

//getting one
router.get("/findOne/:id", getOne);

module.exports = router;
