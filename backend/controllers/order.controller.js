const Order = require("../models/order.model");

//create an order
const createOrder = async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);
    res.status(200).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update an order
const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const allUpdates = {
      ...req.body,
      lastUpdated: Date.now(),
    };
    const updatedOrder = await Order.findByIdAndUpdate(id, allUpdates);
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found !!!!" });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete an order
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found !!!!" });
    }

    res.status(200).json(deletedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all orders
const getAllOrders = async (req, res) => {
  try {
    const { waiter, table, orderStatus, paymentStatus } = req.query;
    const query = {};

    //filter by name
    if (table) {
      query.table = { $regex: table, $options: "i" };
    }

    //by waiter id
    if (waiter) {
      query.waiter = { $regex: waiter, $options: "i" }; // Use regex for partial matching
    }

    //by order status
    if (orderStatus) {
      query.orderStatus = { $regex: orderStatus, $options: "i" };
    }

    //by payment status
    if (paymentStatus) {
      query.paymentStatus = { $regex: paymentStatus, $options: "i" };
    }

    const orders = await Order.find(query);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get one by id
const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const oneGot = await Order.findById(id);

    if (!oneGot) {
      return res.status(404).json({ message: "Order could not be found!!!" });
    }

    res.status(200).json(oneGot);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getAllOrders,
  getOne,
};
