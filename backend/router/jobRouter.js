import express from "express";
import { addJobs, getAllJobs } from "../controller/jobController.js";

const router = express.Router();

// to get all jobs including server side search
router.get("/", getAllJobs);


// to insert jobs
router.post("/add", addJobs);

export default router;
