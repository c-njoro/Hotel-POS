const express = require("express");
const router = express.Router();
const Dish = require("../models/dish.model");

const {
  getAllDishes,
  createDish,
  updateDish,
  deleteDish,
  getOne,
  fetchBulk,
} = require("../controllers/dish.controller");

//getting all
router.get("/", getAllDishes);

//getting one
router.get("/findOne/:id", getOne);

//create dish
router.post("/create", createDish);

//update dish
router.put("/update/:id", updateDish);

//delete a dish
router.delete("/delete/:id", deleteDish);

//getting bulk
router.post("/fetchBulk", fetchBulk);

module.exports = router;
