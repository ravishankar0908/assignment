import { configDotenv } from "dotenv";
import express from "express";
import mongoose from "mongoose";
import jobRouter from "./router/jobRouter.js";
import cors from "cors";
const app = express();
configDotenv({
  override: true,
  quiet: true,
});

// middlewares
app.use(cors({}));
app.use(express.json());
app.use("/api/jobs", jobRouter);

// database connection
const connectDB = async () => {
  await mongoose.connect(`${import.meta.env.MONGODB_URI}`, {
    serverSelectionTimeoutMS: 5000,
  });
  console.log("Database is connected successfully...");
};

app.listen(`${import.meta.env.PORT}`, () => {
  connectDB();
  console.log(`Server is running on port: ${process.env.PORT}`);
});
