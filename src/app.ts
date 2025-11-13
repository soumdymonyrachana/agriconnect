// Load environment variables
import express = require("express");
import dotenv = require("dotenv");
dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // parse JSON bodies

// Simple route
app.get("/", (req, res) => {
  res.send("Hello AgriConnect!");
});

export = app;
