import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import {
  ensureAccessToken,
  hasRefreshToken,
  hasValidAccessToken,
  isAuthRefreshLocked,
  needsAccessTokenRefresh,
  refreshAccessToken,
  waitForAuthReady,
} from "./authRefreshLock";
import CookieUtils from "../utils/cookies.utils";
import JwtUtils from "../utils/jwt.utils";

export function isAbortLikeError(err: unknown): boolean {
  if (!err || typeof err !== "object") {
    return false;
  }

  const axiosErr = err as AxiosError;
  if (axios.isCancel(err)) {
    return true;
  }

  const code = (axiosErr as AxiosError & { code?: string }).code;
  if (code === "ERR_CANCELED") {
    return true;
  }

  const name = (err as { name?: string }).name;
  return name === "AbortError" || name === "CanceledError";
}

const BASE_URL = process.env.SERVER_API_URL ?? process.env.NEXT_PUBLIC_API_URL;

if (process.env.NODE_ENV === "development" && !BASE_URL?.trim()) {
  console.warn(
    "[api] Задайте NEXT_PUBLIC_API_URL или SERVER_API_URL — иначе запросы идут на origin Next.js и корзина/API ломаются.",
  );
}

export const apiClient = axios.create({
  baseURL: BASE_URL || undefined,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

let inTabRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    } else {
      prom.reject(new Error("Refresh completed without token"));
    }
  });
  failedQueue = [];
};

declare module "axios" {
  export interface AxiosRequestConfig {
    skipAuth?: boolean;
    _retry?: boolean;
  }
}

// добавление токена к каждому запросу (с ожиданием refresh из другой вкладки)
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    if (config.skipAuth) return config;

    let token = CookieUtils.getCookie("auth_token");

    if (needsAccessTokenRefresh() && hasRefreshToken()) {
      const ensured = await ensureAccessToken();
      if (ensured) {
        token = ensured;
      }
    }

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
    const AUTH_URLS = ["login", "refresh", "verify-code", "send-code"];

    if (
      originalRequest.url &&
      AUTH_URLS.some((url) => originalRequest.url?.includes(`/auth/${url}`))
    ) {
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest?.skipAuth
    ) {
      if (isAuthRefreshLocked()) {
        const ready = await waitForAuthReady(15_000);
        if (ready && hasValidAccessToken()) {
          const token = CookieUtils.getCookie("auth_token");
          if (token) {
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return apiClient(originalRequest);
          }
        }
      }

      if (inTabRefreshing) {
        return new Promise<string>(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      inTabRefreshing = true;

      try {
        const newAccessToken = await refreshAccessToken();
        apiClient.defaults.headers.common["Authorization"] =
          `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (err) {
        processQueue(err, null);
        const ready = await waitForAuthReady(15_000);
        if (ready && hasValidAccessToken()) {
          const token = CookieUtils.getCookie("auth_token");
          if (token) {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return apiClient(originalRequest);
          }
        }
        if (!isAuthRefreshLocked() && !hasValidAccessToken()) {
          CookieUtils.deleteCookie("auth_token");
          CookieUtils.deleteCookie("refresh_token");
        }
        return Promise.reject(err);
      } finally {
        inTabRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export const tryCatch = async <T>(
  func: () => Promise<T>,
  fallback?: (error: unknown) => void,
): Promise<T | undefined> => {
  try {
    return await func();
  } catch (err) {
    if (isAbortLikeError(err)) {
      return undefined;
    }
    console.error(err);
    fallback?.(err);
    throw err;
  }
};
