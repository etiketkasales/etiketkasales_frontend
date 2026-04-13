import { apiClient } from "~/src/shared/lib/api/client.api";

export type AuthMeUser = {
  id: number;
  phone: string;
  email?: string | null;
  name?: string | null;
  surname?: string | null;
  role: string;
  staff_role?: string | null;
  is_active: boolean;
  created_at?: string;
};

export type AuthMePayload = {
  user: AuthMeUser;
  permissions: string[];
};

let cache: { payload: AuthMePayload; at: number } | null = null;
let inFlight: Promise<AuthMePayload> | null = null;
const TTL_MS = 5 * 60 * 1000;

/**
 * Один источник для /auth/me в админке: кэш TTL + дедуп параллельных вызовов
 * (Refine дергает access control для каждого пункта меню одновременно).
 */
export async function getAuthMeCached(): Promise<AuthMePayload> {
  const now = Date.now();
  if (cache && now - cache.at < TTL_MS) {
    return cache.payload;
  }
  if (inFlight) {
    return inFlight;
  }

  inFlight = (async () => {
    const { data } = await apiClient.get<{
      user?: AuthMeUser;
      permissions?: string[];
    }>("/auth/me");

    if (!data?.user) {
      throw new Error("auth/me: empty user");
    }

    const payload: AuthMePayload = {
      user: data.user,
      permissions: Array.isArray(data.permissions) ? data.permissions : [],
    };
    cache = { payload, at: Date.now() };
    return payload;
  })();

  try {
    return await inFlight;
  } finally {
    inFlight = null;
  }
}

export function clearAuthMeCache(): void {
  cache = null;
}
