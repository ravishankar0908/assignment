import axios from "axios";

const base_api = import.meta.env.VITE_BACKEND_URL;

const instance = axios.create({
  baseURL: base_api,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAllJobs = async (search) => {
  try {
    const allJobs = await instance.get(`${base_api}/api/jobs?search=${search}`);
    return allJobs.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const insertJobs = async (data) => {
  try {
    const insertJob = await instance.post(`${base_api}/api/jobs/add`, data);
    return insertJob.data;
  } catch (error) {
    throw error;
  }
};
