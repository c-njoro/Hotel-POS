const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Appetizer", "Main Course", "Dessert", "Drink"],
    },
    ingredients: [
      {
        type: String,
      },
    ],
    image: {
      type: String,
    },
    availabilityStatus: {
      type: Boolean,
      default: true,
    },
    preparationTime: {
      type: Number,
    },
    nutritionalInfo: {
      calories: Number,
      fat: Number,
      protein: Number,
    },
    spiceLevel: {
      type: Number,
      min: 1,
      max: 5,
    },
    servingSize: {
      type: String,
    },
    discount: {
      type: Number, // e.g., 10 for 10% discount
      default: 0,
    },
    cuisineType: {
      type: String, // e.g., 'Italian', 'Chinese', etc.
    },
    rating: {
      type: Number, // Average rating
      min: 0,
      max: 5,
    },
    allergenInfo: [
      {
        type: String, // e.g., 'Dairy', 'Nuts'
      },
    ],
    isChefSpecial: {
      type: Boolean,
      default: false,
    },
    servingTimes: {
      type: [String],
      enum: ["Breakfast", "Lunch", "Dinner"],
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

const Dish = mongoose.model("Dish", dishSchema);

module.exports = Dish;
