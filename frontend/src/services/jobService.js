import axios from "axios";

const base_api = import.meta.env.VITE_BACKEND_URL;

const instance = axios.create({
  baseURL: base_api,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAllJobs = async (search, location, job, salaryRange) => {
  try {
    const allJobs = await instance.get(
      `${base_api}api/jobs?search=${search}&location=${location}&jobType=${job}&salaryRange=${salaryRange}`
    );
    return allJobs.data;
  } catch (error) {
    throw {
      status: error.response?.status || 500,
      message: error.response?.data?.message || "Something went wrong",
    };
  }
};

export const insertJobs = async (data) => {
  try {
    const insertJob = await instance.post(`${base_api}api/jobs/add`, data);
    return insertJob.data;
  } catch (error) {
    throw error;
  }
};
