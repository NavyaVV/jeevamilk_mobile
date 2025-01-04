import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logout } from "../services/AuthService";

const api = axios.create({
  baseURL: "https://api.jeevamilk.com/api/v1/",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
api.interceptors.request.use(
  async (config) => {
    try {
      // Retrieve token from AsyncStorage
      const tokenString = await AsyncStorage.getItem("userData");
      if (tokenString) {
        const parsedData = JSON.parse(tokenString);
        const token = parsedData?.access;
        if (token) {
          // Set the Authorization header with the token
          config.headers.Authorization = `Bearer ${token}`;
        }
      } else {
        // Remove Authorization header if no token
        delete config.headers["Authorization"];
      }
    } catch (error) {
      console.error("Error fetching token from AsyncStorage:", error);
      return Promise.reject(
        new Error("Failed to retrieve authentication token.")
      );
    }
    return config;
  },
  (error) => {
    // Handle request errors
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    // Handle successful responses
    console.log(`API Endpoint: ${response.config.url}`, response);
    return response;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          AsyncStorage.clear()
          logout();
          break;
        case 403:
          console.error(
            "Forbidden: You do not have permission to perform this action."
          );
          break;
        case 404:
          console.error(
            "Not Found: The requested resource could not be found."
          );
          break;
        case 500:
          console.error("Internal Server Error: Please try again later.");
          break;
        default:
          console.error("An unexpected error occurred.");
          break;
      }
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
