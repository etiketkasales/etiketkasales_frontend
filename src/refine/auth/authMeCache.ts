import { AxiosError } from "axios";
import { apiClient } from "~/src/shared/lib/api/client.api";
import {
  hasValidAccessToken,
  refreshAccessToken,
  waitForAuthReady,
} from "~/src/shared/lib/api/authRefreshLock";
import { getAuthMeQueryClient, syncAuthMeToQueries } from "./authMeQueryBridge";

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

const ME_STORAGE_KEY = "etiketka_auth_me_cache";
let cache: { payload: AuthMePayload; at: number } | null = null;
let inFlight: Promise<AuthMePayload> | null = null;
const TTL_MS = 5 * 60 * 1000;
let crossTabListenerAttached = false;

function readSharedStorage(): { payload: AuthMePayload; at: number } | null {
  if (typeof localStorage === "undefined") return null;
  const raw = localStorage.getItem(ME_STORAGE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as { at?: number; payload?: AuthMePayload };
    if (!parsed.payload || !parsed.at || Date.now() - parsed.at >= TTL_MS) {
      return null;
    }
    return { payload: parsed.payload, at: parsed.at };
  } catch {
    return null;
  }
}

function payloadsEqual(a: AuthMePayload, b: AuthMePayload): boolean {
  return (
    a.user.id === b.user.id &&
    a.user.role === b.user.role &&
    a.user.staff_role === b.user.staff_role &&
    a.permissions.length === b.permissions.length &&
    a.permissions.every((p, i) => p === b.permissions[i])
  );
}

function writeSharedStorage(payload: AuthMePayload): void {
  if (typeof localStorage === "undefined") return;
  if (cache?.payload && payloadsEqual(cache.payload, payload)) {
    return;
  }
  const entry = { at: Date.now(), payload };
  localStorage.setItem(ME_STORAGE_KEY, JSON.stringify(entry));
  syncAuthMeToQueries(payload);
}

/** Поднять кэш React Query из localStorage (только клиент, после гидрации). */
export function hydrateAuthMeFromStorage(): void {
  const shared = readSharedStorage();
  if (!shared) return;
  cache = shared;
  syncAuthMeToQueries(shared.payload);
}

/** Права из памяти / React Query — без сети (для accessControlProvider). */
export function peekAuthPermissions(): string[] | null {
  attachCrossTabMeSync();
  const qc = getAuthMeQueryClient();
  const fromQuery = qc?.getQueryData<AuthMePayload>(["auth", "me"]);
  if (fromQuery?.permissions) {
    return fromQuery.permissions;
  }
  const snap = getAuthMeSnapshot();
  return snap?.permissions ?? null;
}

/** Снимок для мгновенного рендера без сети (между вкладками). */
export function getAuthMeSnapshot(): AuthMePayload | null {
  attachCrossTabMeSync();
  const now = Date.now();
  if (cache && now - cache.at < TTL_MS) {
    return cache.payload;
  }
  const shared = readSharedStorage();
  if (shared) {
    cache = shared;
    return shared.payload;
  }
  return null;
}

async function fetchMeOnce(): Promise<AuthMePayload> {
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
  writeSharedStorage(payload);
  return payload;
}

async function fetchMeWithAuthWait(): Promise<AuthMePayload> {
  try {
    return await fetchMeOnce();
  } catch (err) {
    const is401 = err instanceof AxiosError && err.response?.status === 401;
    if (!is401) {
      throw err;
    }
    try {
      await refreshAccessToken();
      return await fetchMeOnce();
    } catch {
      const ready = await waitForAuthReady(10_000);
      if (!ready) {
        throw err;
      }
      return fetchMeOnce();
    }
  }
}

/**
 * Один источник для /auth/me: память + localStorage между вкладками (без перезагрузки страницы).
 */
export async function getAuthMeCached(): Promise<AuthMePayload> {
  attachCrossTabMeSync();

  const now = Date.now();
  if (cache && now - cache.at < TTL_MS) {
    return cache.payload;
  }

  const shared = readSharedStorage();
  if (shared) {
    cache = shared;
    return shared.payload;
  }

  if (inFlight) {
    return inFlight;
  }

  if (!hasValidAccessToken()) {
    const ready = await waitForAuthReady(10_000);
    if (!ready) {
      throw new Error("auth/me: no valid token");
    }
    const sharedAfterWait = readSharedStorage();
    if (sharedAfterWait) {
      cache = sharedAfterWait;
      return sharedAfterWait.payload;
    }
  }

  inFlight = fetchMeWithAuthWait();

  try {
    return await inFlight;
  } finally {
    inFlight = null;
  }
}

export function clearAuthMeCache(): void {
  cache = null;
  if (typeof localStorage !== "undefined") {
    localStorage.removeItem(ME_STORAGE_KEY);
  }
  getAuthMeQueryClient()?.removeQueries({ queryKey: ["auth", "me"] });
}

/** Обновление кэша из другой вкладки — без invalidate React Query. */
export function attachCrossTabMeSync(): void {
  if (crossTabListenerAttached || typeof window === "undefined") {
    return;
  }
  crossTabListenerAttached = true;

  window.addEventListener("storage", (e) => {
    if (e.key !== ME_STORAGE_KEY || !e.newValue) return;
    try {
      const parsed = JSON.parse(e.newValue) as {
        at?: number;
        payload?: AuthMePayload;
      };
      if (parsed.payload && parsed.at) {
        const next = { payload: parsed.payload, at: parsed.at };
        if (cache && payloadsEqual(cache.payload, parsed.payload)) {
          return;
        }
        cache = next;
        syncAuthMeToQueries(parsed.payload);
      }
    } catch {
      /* ignore */
    }
  });
}

const AUTH_ME_QUERY_OPTS = {
  staleTime: 5 * 60 * 1000,
  gcTime: 30 * 60 * 1000,
  refetchOnMount: false as const,
  refetchOnWindowFocus: false as const,
  refetchOnReconnect: false as const,
};

export function authMeQueryOptions() {
  return {
    queryKey: ["auth", "me"] as const,
    queryFn: () => getAuthMeCached(),
    retry: 1,
    retryDelay: 400,
    placeholderData: (prev: AuthMePayload | undefined) => prev,
    ...AUTH_ME_QUERY_OPTS,
  };
}
