const Dish = require("../models/dish.model");

//get all dishes
const getAllDishes = async (req, res) => {
  try {
    const { name, price, servingTime, cuisine, category } = req.query;
    const query = {};

    //filter by name
    if (name) {
      query.name = { $regex: name, $options: "i" };
    }
    //by cuisine/origin
    if (cuisine) {
      query.cuisine = { $regex: cuisine, $options: "i" };
    }

    //by serving time
    if (servingTime) {
      query.servingTime = { $in: [servingTime] }; // checks if the passed cuisine is in the array
    }

    //by category
    if (category) {
      query.category = { $regex: category, $options: "i" };
    }

    // Filter by exact price
    if (price) {
      query.price = Number(price);
    }

    const dishes = await Dish.find(query);
    res.status(200).json(dishes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get one by id
const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const oneGot = await Dish.findById(id);

    if (!oneGot) {
      return res.status(404).json({ message: "Dish could not be found!!!" });
    }

    res.status(200).json(oneGot);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//create a dish
const createDish = async (req, res) => {
  try {
    const dish = await Dish.create(req.body);
    res.status(200).json(dish);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update a dish
const updateDish = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDish = await Dish.findByIdAndUpdate(id, req.body);

    if (!updatedDish) {
      return res.status(404).json({ message: "Dish could not be found" });
    }

    res.status(200).json(updatedDish);
  } catch (error) {
    res.status(500).jason({ message: error.message });
  }
};

//delete a dish
const deleteDish = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDish = await Dish.findByIdAndDelete(id);

    if (!deletedDish) {
      return res.status(400).json({ message: "Dish could not be found!!!" });
    }

    res.status(200).json(deletedDish);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllDishes,
  createDish,
  updateDish,
  deleteDish,
  getOne,
};
