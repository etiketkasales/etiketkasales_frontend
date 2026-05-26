import { apiClient } from "./client.api";
import {
  applySyncedAccessToken,
  ensureAccessToken,
  hasRefreshToken,
  hasValidAccessToken,
  needsAccessTokenRefresh,
  readSyncedAccessToken,
  waitForAuthReady,
} from "./authRefreshLock";
import {
  attachCrossTabMeSync,
  hydrateAuthMeFromStorage,
} from "~/src/refine/auth/authMeCache";
import { getQueryClient } from "~/src/shared/lib/queryClient";
import { registerAuthMeQueryClient } from "~/src/refine/auth/authMeQueryBridge";
import CookieUtils from "../utils/cookies.utils";

let bootstrapPromise: Promise<void> | null = null;

declare global {
  interface Window {
    __etiketkaAuthBootstrapped?: boolean;
  }
}

/**
 * Один раз на вкладку: подхват JWT из другой вкладки, затем рендер приложения
 */
export function waitForAuthBootstrap(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }
  if (window.__etiketkaAuthBootstrapped) {
    return Promise.resolve();
  }
  if (!bootstrapPromise) {
    bootstrapPromise = runAuthBootstrap().finally(() => {
      window.__etiketkaAuthBootstrapped = true;
    });
  }
  return bootstrapPromise;
}

async function runAuthBootstrap(): Promise<void> {
  registerAuthMeQueryClient(getQueryClient());
  attachCrossTabMeSync();

  const synced = readSyncedAccessToken();
  if (synced) {
    applySyncedAccessToken(synced);
  }

  if (hasRefreshToken() && needsAccessTokenRefresh()) {
    await ensureAccessToken();
  } else if (!hasValidAccessToken() && hasRefreshToken()) {
    await waitForAuthReady(8_000);
  }

  hydrateAuthMeFromStorage();

  const token = CookieUtils.getCookie("auth_token");
  if (token) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
}
