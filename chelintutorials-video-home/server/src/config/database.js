const mongoose = require("mongoose");

const MONGODB_OPTIONS = {
  // Add any other options from your .env file
};

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, MONGODB_OPTIONS);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
