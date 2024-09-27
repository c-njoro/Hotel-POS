const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

const {
  createUser,
  deleteUser,
  updateUser,
  getAllUsers,
  getOne,
  findViaEmail,
} = require("../controllers/user.controller");

//create user
router.post("/create", createUser);

//updating user
router.put("/update/:id", updateUser);

//deleting user
router.delete("/delete/:id", deleteUser);

//getting users
router.get("/", getAllUsers);

//getting one via id
router.get("/findOne/:id", getOne);

//finding a user
router.get("/find", findViaEmail);

module.exports = router;
