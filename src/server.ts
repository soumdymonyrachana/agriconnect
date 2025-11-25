import express from "express";
import { swaggerDocs } from "../src/ config/swagger";
import dotenv from "dotenv";
import connectDB from "../src/ config/db";
import Router from "./routes/index";
import mongoose from "mongoose";
import { seedAdmin } from "./seed/seedAdmin";

dotenv.config();

const app = express();
app.use(express.json());

// Use routes
app.use("/api/v1", Router);

const port = 4000;

connectDB().then(async () => {
  await seedAdmin();

  swaggerDocs(app, port);

  app.use(express.urlencoded({ extended: true }));

  app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
});
