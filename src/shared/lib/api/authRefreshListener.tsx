"use client";

import { useEffect } from "react";
import { apiClient } from "./client.api";
import {
  applySyncedAccessToken,
  listenForAuthTokenSync,
} from "./authRefreshLock";
import CookieUtils from "../utils/cookies.utils";

/**
 * Только подписки на sync из других вкладок (без bootstrap — см. AuthBootstrap).
 */
export function AuthRefreshListener() {
  useEffect(() => {
    const unsub = listenForAuthTokenSync((token) => {
      const current = CookieUtils.getCookie("auth_token");
      if (current === token) return;
      applySyncedAccessToken(token);
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    });

    return unsub;
  }, []);

  return null;
}
