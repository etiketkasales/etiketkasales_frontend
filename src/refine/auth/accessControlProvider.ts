"use client";

import type { AccessControlProvider } from "@refinedev/core";
import { canRefineAccess } from "./roles";
import { getAuthMeCached } from "./authMeCache";

export const accessControlProvider: AccessControlProvider = {
  can: async ({ resource, action }) => {
    if (!resource || !action) {
      return { can: false };
    }
    try {
      const { permissions } = await getAuthMeCached();
      return {
        can: canRefineAccess(permissions, String(resource), String(action)),
      };
    } catch {
      return { can: false };
    }
  },
};
