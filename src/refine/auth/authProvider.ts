"use client";

import type { AuthProvider } from "@refinedev/core";
import CookieUtils from "~/src/shared/lib/utils/cookies.utils";
import { getEffectiveAdminRole } from "~/src/refine/auth/roles";
import { waitForAuthReady } from "~/src/shared/lib/api/authRefreshLock";
import {
  clearAuthMeCache,
  getAuthMeCached,
} from "~/src/refine/auth/authMeCache";
import { getHeaderDisplayName } from "~/src/features/user/lib/user-display-name";

export const authProvider: AuthProvider = {
  login: async () => ({
    success: false,
    error: {
      name: "LoginRequired",
      message: "Используйте существующий экран логина",
    },
  }),

  logout: async () => {
    clearAuthMeCache();
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem("etiketka_auth_token_sync");
    }
    CookieUtils.deleteCookie("auth_token");
    CookieUtils.deleteCookie("refresh_token");
    if (typeof window !== "undefined") {
      window.location.assign("/login");
    }
    return { success: true, redirectTo: "/login" };
  },

  check: async () => {
    const ready = await waitForAuthReady(20_000);
    const token = CookieUtils.getCookie("auth_token");
    if (!ready || !token) {
      return { authenticated: false, redirectTo: "/login" };
    }

    // В /admin права проверяет AdminGate — не редиректим вкладки при гонке refresh.
    if (
      typeof window !== "undefined" &&
      window.location.pathname.startsWith("/admin")
    ) {
      return { authenticated: true };
    }

    try {
      const { user } = await getAuthMeCached();
      if (!getEffectiveAdminRole(user)) {
        return { authenticated: false, redirectTo: "/" };
      }
      return { authenticated: true };
    } catch {
      return { authenticated: false, redirectTo: "/login" };
    }
  },

  getPermissions: async () => {
    try {
      const { user } = await getAuthMeCached();
      return getEffectiveAdminRole(user) || null;
    } catch {
      return null;
    }
  },

  getIdentity: async () => {
    try {
      const { user } = await getAuthMeCached();
      return {
        id: user.id,
        name: getHeaderDisplayName(user),
        avatar: undefined,
      };
    } catch {
      return null;
    }
  },

  onError: async () => ({ error: undefined }),
};
