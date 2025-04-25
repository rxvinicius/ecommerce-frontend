import axios from "axios";
import { logout } from "@/hooks/useAuthActions";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error?.response?.status === 401 &&
      error?.response?.data?.message?.includes("jwt expired")
    ) {
      logout();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
