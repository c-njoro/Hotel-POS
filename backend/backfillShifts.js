const mongoose = require("mongoose");
const User = require("./models/user.model");

// Replace with your MongoDB connection string
const MONGO_URI = "mongodb://localhost:27017/HotelDatabase";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to MongoDB");

    const result = await User.updateMany(
      { shifts: { $exists: false } },
      { $set: { shifts: [] } }
    );

    console.log(`${result.modifiedCount} user(s) updated.`);
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
