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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// database connection
const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Database is connected successfully...");
};

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server is running on port: ${process.env.PORT}`);
});
