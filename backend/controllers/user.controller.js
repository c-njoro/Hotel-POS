const User = require("../models/user.model");
const bcrypt = require("bcrypt");
//create user
const createUser = async (req, res) => {
  try {
    const duplicate = await User.findOne({ email: req.body.email });
    if (duplicate) {
      return res.status(409).json({ message: "User already exists" });
    }

    if (
      !req.body.email ||
      !req.body.name ||
      !req.body.username ||
      !req.body.password
    ) {
      return res.status(400).json({ message: "Crucial user Info missing" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = await User.create({
      ...req.body,
      profilePicture: "",
      password: hashedPassword,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(400).json({ message: "User could not be found!!!" });
    }

    res.status(200).json({ message: "User deleted successfully!!!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedUser = await User.findByIdAndUpdate(id, req.body);

    if (!updatedUser) {
      return res.status(400).json({ message: "User could not be found!!!" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get users
const getAllUsers = async (req, res) => {
  try {
    const { name, role } = req.query;
    const query = {};

    // Filter by name
    if (name) {
      query.name = { $regex: name, $options: "i" };
    }

    //by role
    if (role) {
      query.role = { $regex: role, $options: "i" };
    }

    const users = await User.find(query);

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get one by id
const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const oneGot = await User.findById(id);

    if (!oneGot) {
      return res.status(404).json({ message: "User could not be found!!!" });
    }

    res.status(200).json(oneGot);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//find a user using email, this is used while authenticating a user log in in the front end
const findViaEmail = async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//user to change password using this
const changePassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) {
      return res.status(409).json({ message: "Wrong Old Password" });
    }

    const newHashed = await bcrypt.hash(newPassword, 10);

    user.password = newHashed;
    await user.save();

    res.status(200).json({ message: "User password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  deleteUser,
  updateUser,
  getAllUsers,
  getOne,
  findViaEmail,
  changePassword,
};
