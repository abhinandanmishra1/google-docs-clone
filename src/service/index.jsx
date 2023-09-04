import axios from "axios";

const baseURL = import.meta.env.VITE_DOCS_SERVER_BASE_URL;

// axios.defaults.withCredentials = true; 

export const getAxios = () => {
  const access_token = localStorage.getItem("authToken");
  const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });

  return axiosInstance;
};
