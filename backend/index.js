import { configDotenv } from "dotenv";
import express from "express";
import mongoose from "mongoose";
import jobRouter from "./router/jobRouter.js";
import cors from "cors";
const app = express();
configDotenv({
  override: true,
});

// middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.json());
app.use("/api/jobs", jobRouter);

// database connection
const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 30000, // Increased timeout
    socketTimeoutMS: 45000,
    bufferMaxEntries: 0, // Disable mongoose buffering
    maxPoolSize: 10,
    retryWrites: true,
  });
  console.log("Database is connected successfully...");
};

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server is running on port: ${process.env.PORT}`);
});
