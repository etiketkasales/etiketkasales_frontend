import { AxiosError } from "axios";
import { hasValidAccessToken, waitForAuthReady } from "./authRefreshLock";

/** Повтор запроса после sync/refresh из другой вкладки (без ложного logout). */
export async function withAuthRetry<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    const is401 = err instanceof AxiosError && err.response?.status === 401;
    if (!is401) {
      throw err;
    }
    const ready = await waitForAuthReady(20_000);
    if (ready && hasValidAccessToken()) {
      return await fn();
    }
    throw err;
  }
}
