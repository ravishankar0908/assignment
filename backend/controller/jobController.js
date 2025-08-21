    import jobModel from "../model/jobModel.js";
    import { statusCodes } from "../utils/codesUtils.js";
    import { messages } from "../utils/messagesUtils.js";

    // to get all jobs including server side search
    export const getAllJobs = async (req, res) => {
    try {
        const { search } = req.query;

        const query = search
        ? {
            $or: [
                { title: { $regex: search, $options: "i" } },
                { location: { $regex: search, $options: "i" } },
                { jobType: { $regex: search, $options: "i" } },
            ],
            }
        : {};

        const jobs = await jobModel.find(query);

        if (jobs.length === 0) {
        return res.status(statusCodes.notFound).json({
            jobs,
            message: messages.notFound,
        });
        }

        return res.status(statusCodes.success).json({
        jobs,
        });
    } catch (error) {
        return res.status(statusCodes.server).json({
        message: error.message,
        });
    }
    };

    // to insert jobs
    export const addJobs = async (req, res) => {
    try {
        const {
        title,
        companyName,
        location,
        jobType,
        salaryRange,
        description,
        applicationDeadline,
        } = req.body;

        console.log(
        title,
        companyName,
        location,
        jobType,
        salaryRange,
        description,
        applicationDeadline
        );

        const isInsertJob = await jobModel.create({
        title,
        companyName,
        location,
        jobType,
        salaryRange,
        description,
        applicationDeadline,
        });

        if (!isInsertJob) {
        return res.status(statusCodes.created).json({
            message: messages.notCreated,
        });
        }

        return res.status(statusCodes.notFound).json({
        message: messages.created,
        });
    } catch (error) {
        return res.status(statusCodes.server).json({
        message: error.message,
        });
    }
    };
