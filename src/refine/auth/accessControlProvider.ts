"use client";

import type { AccessControlProvider } from "@refinedev/core";
import { peekAuthPermissions } from "./authMeCache";
import { canRefineAccess } from "./roles";

/**
 * Только синхронный кэш — без await getAuthMeCached(), иначе Refine дергает
 * десятки /auth/me и refresh при каждом рендере таблиц.
 */
export const accessControlProvider: AccessControlProvider = {
  can: async ({ resource, action }) => {
    if (!resource || !action) {
      return { can: false };
    }
    const permissions = peekAuthPermissions();
    if (!permissions) {
      return { can: false };
    }
    return {
      can: canRefineAccess(permissions, String(resource), String(action)),
    };
  },
};
