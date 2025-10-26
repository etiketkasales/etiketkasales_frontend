import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import CookieUtils from "../utils/cookies.utils";
import JwtUtils from "../utils/jwt.utils";

const BASE_URL = process.env.SERVER_API_URL ?? process.env.NEXT_PUBLIC_API_URL;

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

let isRefreshing: boolean = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

// добавление токена к каждому запросу
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = CookieUtils.getCookie("auth_token");

    if (token && !JwtUtils.isExpiredToken(token)) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// перехват 401 кода и обновление токена
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = CookieUtils.getCookie("refresh_token");
        if (!refreshToken) throw new Error("Refresh token not found");

        const res = await axios.post(`${BASE_URL}/auth/refresh/`, {
          refresh_token: refreshToken,
        });

        const newAccessToken = res.data.access_token;
        if (newAccessToken) {
          CookieUtils.setCookieWithToken("auth_token", newAccessToken);

          apiClient.defaults.headers.common["Authorization"] =
            `Bearer ${newAccessToken}`;

          processQueue(null, newAccessToken);
        }

        return apiClient(originalRequest);
      } catch (err) {
        processQueue(err, null);
        CookieUtils.deleteCookie("auth_token");
        CookieUtils.deleteCookie("refresh_token");
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export const tryCatch = async <T>(
  func: () => Promise<T>,
  fallback?: () => void,
) => {
  try {
    const res = await func();
    return res;
  } catch (err) {
    console.error(err);
    fallback?.();
    throw err;
  }
};
