/* eslint-disable @typescript-eslint/no-require-imports */
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config({ path: __dirname + "/.env" });

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Add this line after the middleware
app.use("/api/youtube", require("./youtube"));

console.log("MongoDB uri:", process.env.MONGODB_URI);
// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Example API Route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the Express backend!" });
});

// Start Server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
