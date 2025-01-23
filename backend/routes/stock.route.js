const express = require("express");
const router = express.Router();

const {
  getAllStock,
  createStock,
  getOneStock,
  updateStock,
  deleteStock,
} = require("../controllers/stock.controller");

router.get("/", getAllStock);

router.post("/create", createStock);

router.get("/findOne/:id", getOneStock);

router.put("/update/:id", updateStock);

router.delete("/delete/:id", deleteStock);

module.exports = router;
