/* eslint-disable @typescript-eslint/no-require-imports */
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/database");
const startVideoUpdateService = require("./src/services/videoUpdateService");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Servir archivos estáticos del cliente
app.use(express.static(path.join(__dirname, "../client/build")));

// Routes
app.use("/api/videos", require("./src/routes/videos"));

// Example API Route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the Express backend!" });
});

// Ruta para servir la aplicación React
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

// Connect to database
connectDB();

// Start video update service
startVideoUpdateService();

// Start Server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
