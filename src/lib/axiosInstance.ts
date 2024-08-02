import { logout } from "@/slice/authSlice";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.BASE_URL,
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const userString = sessionStorage.getItem("user");
    let accessToken = "";

    if (userString) {
      const user = JSON.parse(userString);
      accessToken = user.accessToken;
    }

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear user data from session storage
      sessionStorage.clear();
      logout();

      // Redirect to login
      window.location.href = "/"; // or use useNavigate in a React component
    }
    return Promise.reject(error);
  }
);
