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

app.use(cors());
app.use(express.json());
app.use("/api/jobs", jobRouter);

// database connection
const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Database is connected successfully...");
};

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port: ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error("DB connection failed:", err.message);
  });
