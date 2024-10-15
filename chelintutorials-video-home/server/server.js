/* eslint-disable @typescript-eslint/no-require-imports */
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/database");
const startVideoUpdateService = require("./src/services/videoUpdateService");

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/videos", require("./src/routes/videos"));

// Example API Route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the Express backend!" });
});

// Connect to database
connectDB();

// Start video update service
startVideoUpdateService();

// Start Server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
