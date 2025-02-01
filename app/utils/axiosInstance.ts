import axios from "axios";
import Cookies from "js-cookie";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
const baseURL: string = `${process.env.NEXT_PUBLIC_API_URL}/api`;

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("access_token");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = Cookies.get("refresh_token");
    if (
      error.response.status === 401 &&
      error.response?.data?.error_code === "blocked"
    ) {
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
    if (
      error.response.status === 401 &&
      refreshToken &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          `${baseURL + API_ENDPOINTS.REFRESH_TOKEN}`,
          {
            refresh_token: refreshToken,
          }
        );

        const newAccessToken = res?.data?.data?.access_token;
        const newRefreshToken = res?.data?.data?.refresh_token;
        Cookies.set("access_token", newAccessToken, {
          expires: 0.0208, // 30 minutes expressed in days (30 minutes = 1/48 of a day)
          secure: true,
        });
        Cookies.set("refresh_token", newRefreshToken, {
          expires: 7,
          secure: true,
        });

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
