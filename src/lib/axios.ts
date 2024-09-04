import axios from "axios";
import { getSessionToken, logout } from "@/actions/login-actions";

const axiosInstance = axios.create({
  baseURL: process.env.DOMAIN_DEV,
  headers: {
    "Content-Type": "application/json",
  },
});

// List of URLs that do not require authentication
const authExcludedUrls = [
  "/api/v1/users/login",
  "/api/v1/users/activate-account",
];

// Request interceptor to add the token to the headers
axiosInstance.interceptors.request.use(
  async (config) => {
    // Check if the URL is in the excluded list
    if (!authExcludedUrls.includes(config.url || "")) {
      const token = await getSessionToken();

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      } else {
        await logout(); // Handle logout if token is missing
        throw new axios.Cancel("User is not authenticated");
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      logout(); // Handle logout on 401 Unauthorized response
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
