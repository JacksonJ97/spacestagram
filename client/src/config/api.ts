import axios, { type InternalAxiosRequestConfig } from "axios";
import client from "config/client";
import type { ServerError } from "src/global";
import { API_BASE_URL } from "utils/constants";

const options = {
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: { Accept: "application/json" },
};

const api = axios.create(options);

api.defaults.headers.post["Content-Type"] = "application/json";
api.defaults.headers.put["Content-Type"] = "application/json";
api.defaults.headers.patch["Content-Type"] = "application/json";

const RETRY_FLAG = "x-retried-after-refresh" as const;

let promise: Promise<void> | null = null;

function queueTokenRefresh() {
  if (!promise) {
    promise = api
      .post("/api/auth/refresh")
      .then(() => {})
      .finally(() => {
        promise = null;
      });
  }

  return promise;
}

const CODES = new Set([
  "ACCESS_TOKEN_MISSING",
  "ACCESS_TOKEN_EXPIRED",
  "ACCESS_TOKEN_INVALID",
]);

api.interceptors.response.use(
  (response) => response,
  async (error: ServerError) => {
    const { response } = error;

    const config = error.config as
      | (InternalAxiosRequestConfig & { [RETRY_FLAG]?: boolean })
      | undefined;

    if (!config || !response) return Promise.reject(error);

    if (response.status !== 401 || !CODES.has(response.data.code)) {
      return Promise.reject(error);
    }

    if (config.url && config.url.includes("/api/auth/refresh")) {
      return Promise.reject(error);
    }

    if (config[RETRY_FLAG]) return Promise.reject(error);

    try {
      await queueTokenRefresh();

      config[RETRY_FLAG] = true;

      return api.request(config);
    } catch {
      // If the refresh fails and the request is from /api/users/me
      // then treat the user as unauthenticated (null)
      if (config.url && config.url.includes("/api/users/me")) {
        return Promise.resolve({
          ...response,
          config,
          data: null,
          status: 200,
        });
      }

      client.clear();
      window.location.replace("/login");
      return Promise.reject(error);
    }
  },
);

export default api;
