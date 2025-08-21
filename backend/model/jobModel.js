import mongoose from "mongoose";

const jobShema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true],
      index: true,
    },
    companyName: {
      type: String,
      required: [true],
    },

    location: {
      type: String,
      required: [true],
      index: true,
    },

    jobType: {
      type: String,
      required: [true],
      index: true,
    },

    salaryRange: {
      min: { type: String, required: true },
      max: { type: String, required: true },
    },
    description: {
      type: String,
      required: [true],
    },

    applicationDeadline: {
      type: String,
      required: [true],
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const jobModel = mongoose.model("jobs", jobShema);

export default jobModel;
