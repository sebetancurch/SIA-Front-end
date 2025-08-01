import axios from "axios";
import { azureUrls } from "@/services/urls";
import { cookies } from "next/headers";
import { useAuthStore } from "@/store/LoggedUserStore";
import { logout } from "@/services/user";

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
  "/api/v1/users/open-course",
  "/api/v1/users/refresh-token",
];

// Request interceptor to add the token to the headers
axiosInstance.interceptors.request.use(
  async (config) => {
    // Check if the URL is in the excluded list
    if (!authExcludedUrls.includes(config.url || "")) {
      const accessToken = cookies().get("accessToken")?.value;
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
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
  async (error) => {
    const originalRequest = error.config;
    // Handle 401 Unauthorized response
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // Try to refresh the token
      try {
        const response = await axiosInstance.post(azureUrls.users.refreshToken, {}, {
          withCredentials: true,
        });
        const newAccessToken = response.headers["Authorization"];
        if (newAccessToken) {
          cookies().set("accessToken", newAccessToken);
          // Set client-side session flag
          originalRequest.headers["Authorization"] = newAccessToken;
          return axiosInstance.request(originalRequest);
        } else {
          // Clear session flag
          useAuthStore.getState().clearAuth();
          await logout();
        }
      } catch (refreshError) {
        await logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
