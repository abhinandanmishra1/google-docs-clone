import axios from "axios";

const baseURL = import.meta.env.VITE_DOCS_SERVER_BASE_URL;

// axios.defaults.withCredentials = true;

export const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
