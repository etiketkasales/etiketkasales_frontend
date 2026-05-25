"use client";

import { useEffect, useLayoutEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { apiClient } from "./client.api";
import {
  applySyncedAccessToken,
  listenForAuthTokenSync,
} from "./authRefreshLock";
import CookieUtils from "../utils/cookies.utils";
import {
  attachCrossTabMeSync,
  hydrateAuthMeFromStorage,
} from "~/src/refine/auth/authMeCache";
import { registerAuthMeQueryClient } from "~/src/refine/auth/authMeQueryBridge";

/**
 * Синхронизация JWT между вкладками.
 * Без invalidateQueries — иначе Refine/AdminGate «мигают» как полная перезагрузка.
 */
export function AuthRefreshListener() {
  const queryClient = useQueryClient();

  useLayoutEffect(() => {
    registerAuthMeQueryClient(queryClient);
    attachCrossTabMeSync();
    hydrateAuthMeFromStorage();
    const token = CookieUtils.getCookie("auth_token");
    if (token) {
      apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
  }, [queryClient]);

  useEffect(() => {
    return listenForAuthTokenSync((token) => {
      const current = CookieUtils.getCookie("auth_token");
      if (current === token) return;
      applySyncedAccessToken(token);
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    });
  }, []);

  return null;
}
