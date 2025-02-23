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

const links = {
  'TLC': 'https://limoncito.substack.com/p/e556df63-5f7b-4926-a2b3-643c3cddf1fb'
};

// Route to handle short URLs
app.get('/:shortlink', (req, res) => {
  const destination = links[req.params.shortlink];

  if (destination) {
    res.redirect(301, destination); // 301 for a permanent redirect
  } else {
    res.status(404).send('Link not found');
  }
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
