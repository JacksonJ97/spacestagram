import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "utils/constants";
import client from "config/client";

const options = {
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

const api = axios.create(options);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<{ code: string; message: string }>) => {
    const { config, response } = error;

    if (
      response &&
      response.status === 401 &&
      response.data.code === "ACCESS_TOKEN_MISSING"
    ) {
      try {
        await api.post("/api/auth/refresh");
        if (config) {
          return api.request(config);
        }
      } catch {
        client.clear();
        window.location.replace("/login");
      }
    }

    return Promise.reject(error);
  },
);

export default api;
