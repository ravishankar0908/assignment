import { configDotenv } from "dotenv";
import express from "express";
import mongoose from "mongoose";
import jobRouter from "./router/jobRouter.js";
const app = express();
configDotenv({
  override: true,
  quiet: true,
});

// middlewares
app.use(express.json());
app.use("/api/jobs", jobRouter);

// database connection
const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
  });
  console.log("Database is connected successfully...");
};

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server is running on port: ${process.env.PORT}`);
});
