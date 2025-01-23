const Stock = require("../models/stock.model");

// Get all stock items
const getAllStock = async (req, res) => {
  try {
    const { name, category, quantity, unit } = req.query;
    const query = {};

    // Filter by name
    if (name) {
      query.name = { $regex: name, $options: "i" };
    }

    // Filter by category
    if (category) {
      query.category = { $regex: category, $options: "i" };
    }

    // Filter by minimum quantity
    if (quantity) {
      query.quantity = { $gte: Number(quantity) };
    }

    // Filter by unit
    if (unit) {
      query.unit = { $regex: unit, $options: "i" };
    }

    const stock = await Stock.find(query);
    res.status(200).json(stock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single stock item by ID
const getOneStock = async (req, res) => {
  try {
    const { id } = req.params;
    const stockItem = await Stock.findById(id);

    if (!stockItem) {
      return res.status(404).json({ message: "Stock item not found!" });
    }

    res.status(200).json(stockItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new stock item
const createStock = async (req, res) => {
  try {
    const stock = await Stock.create(req.body);
    res.status(201).json(stock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a stock item
const updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStock = await Stock.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedStock) {
      return res.status(404).json({ message: "Stock item not found!" });
    }

    res.status(200).json(updatedStock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a stock item
const deleteStock = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStock = await Stock.findByIdAndDelete(id);

    if (!deletedStock) {
      return res.status(404).json({ message: "Stock item not found!" });
    }

    res.status(200).json(deletedStock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllStock,
  getOneStock,
  createStock,
  updateStock,
  deleteStock,
};
