import axios from "axios";
import CookieUtils from "../utils/cookies.utils";
import JwtUtils from "../utils/jwt.utils";

const BASE_URL = process.env.SERVER_API_URL ?? process.env.NEXT_PUBLIC_API_URL;

const LOCK_KEY = "etiketka_auth_refresh_lock";
const TOKEN_SYNC_KEY = "etiketka_auth_token_sync";
const LOCK_TTL_MS = 45_000;
const TOKEN_SYNC_TTL_MS = 90_000;
const AUTH_CHANNEL = "etiketka_auth";

const TAB_ID =
  typeof sessionStorage !== "undefined"
    ? sessionStorage.getItem("etiketka_tab_id") ||
      (() => {
        const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
        sessionStorage.setItem("etiketka_tab_id", id);
        return id;
      })()
    : "server";

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function readLock(): { tab: string; at: number } | null {
  if (typeof localStorage === "undefined") return null;
  const raw = localStorage.getItem(LOCK_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as { tab: string; at: number };
  } catch {
    return null;
  }
}

function tryAcquireLock(): boolean {
  const now = Date.now();
  const current = readLock();
  if (current && current.tab !== TAB_ID && now - current.at < LOCK_TTL_MS) {
    return false;
  }
  localStorage.setItem(LOCK_KEY, JSON.stringify({ tab: TAB_ID, at: now }));
  return true;
}

function releaseLock(): void {
  const current = readLock();
  if (current?.tab === TAB_ID) {
    localStorage.removeItem(LOCK_KEY);
  }
}

export function hasValidAccessToken(): boolean {
  const token = CookieUtils.getCookie("auth_token");
  return Boolean(token && !JwtUtils.isExpiredToken(token));
}

export function hasRefreshToken(): boolean {
  return Boolean(CookieUtils.getCookie("refresh_token"));
}

export function needsAccessTokenRefresh(): boolean {
  const token = CookieUtils.getCookie("auth_token");
  return !token || JwtUtils.isExpiredToken(token);
}

/** Другая вкладка сейчас делает refresh — не сбрасывать cookies локально. */
export function isAuthRefreshLocked(): boolean {
  const current = readLock();
  if (!current) return false;
  return Date.now() - current.at < LOCK_TTL_MS;
}

function postAuthChannel(type: string): void {
  try {
    new BroadcastChannel(AUTH_CHANNEL).postMessage({ type });
  } catch {
    /* ignore */
  }
}

/** Другие вкладки подхватывают новый access token без повторного refresh. */
export function broadcastAccessToken(token: string): void {
  if (typeof localStorage === "undefined") return;
  const existing = readSyncedToken();
  if (existing === token) {
    return;
  }
  try {
    const raw = localStorage.getItem(TOKEN_SYNC_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as { token?: string };
      if (parsed.token === token) {
        return;
      }
    }
  } catch {
    /* ignore */
  }
  localStorage.setItem(
    TOKEN_SYNC_KEY,
    JSON.stringify({ token, at: Date.now() }),
  );
  postAuthChannel("token_ready");
}

export function applySyncedAccessToken(token: string): void {
  CookieUtils.setCookieWithToken("auth_token", token);
}

/** Токен, записанный другой вкладкой (localStorage). */
export function readSyncedAccessToken(): string | null {
  return readSyncedToken();
}

function readSyncedToken(): string | null {
  if (typeof localStorage === "undefined") return null;
  const raw = localStorage.getItem(TOKEN_SYNC_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as { token?: string; at?: number };
    if (
      !parsed.token ||
      !parsed.at ||
      Date.now() - parsed.at > TOKEN_SYNC_TTL_MS
    ) {
      return null;
    }
    return parsed.token;
  } catch {
    return null;
  }
}

/**
 * Ждём завершения refresh в другой вкладке (без редиректа на /login).
 */
export function waitForAuthReady(timeoutMs = 8000): Promise<boolean> {
  if (hasValidAccessToken()) {
    return Promise.resolve(true);
  }

  const synced = readSyncedToken();
  if (synced) {
    applySyncedAccessToken(synced);
    if (hasValidAccessToken()) {
      return Promise.resolve(true);
    }
  }

  if (typeof window === "undefined") {
    return Promise.resolve(false);
  }

  return new Promise((resolve) => {
    const deadline = Date.now() + timeoutMs;
    let channel: BroadcastChannel | null = null;

    try {
      channel = new BroadcastChannel(AUTH_CHANNEL);
    } catch {
      channel = null;
    }

    const done = (ok: boolean) => {
      channel?.close();
      window.removeEventListener("storage", onStorage);
      resolve(ok);
    };

    const tick = () => {
      const syncedNow = readSyncedToken();
      if (syncedNow) {
        applySyncedAccessToken(syncedNow);
      }
      if (hasValidAccessToken()) {
        done(true);
        return;
      }
      if (Date.now() >= deadline) {
        done(false);
      }
    };

    const onStorage = (e: StorageEvent) => {
      if (e.key === TOKEN_SYNC_KEY || e.key === LOCK_KEY) {
        tick();
      }
    };

    channel?.addEventListener("message", () => tick());
    window.addEventListener("storage", onStorage);

    const loop = async () => {
      while (Date.now() < deadline) {
        tick();
        if (hasValidAccessToken()) {
          return;
        }
        await sleep(100);
      }
      done(hasValidAccessToken());
    };

    void loop();
  });
}

/**
 * Один refresh на все вкладки: Web Locks или mutex в localStorage + ожидание sync.
 */
export async function runAuthRefreshOnce(
  refreshFn: () => Promise<string>,
): Promise<string> {
  if (typeof navigator !== "undefined" && navigator.locks?.request) {
    const token = await navigator.locks.request(
      "etiketka-auth-refresh",
      refreshFn,
    );
    broadcastAccessToken(token);
    return token;
  }

  if (tryAcquireLock()) {
    try {
      const token = await refreshFn();
      broadcastAccessToken(token);
      return token;
    } finally {
      releaseLock();
    }
  }

  const deadline = Date.now() + LOCK_TTL_MS;
  while (Date.now() < deadline) {
    const synced = readSyncedToken();
    if (synced) {
      applySyncedAccessToken(synced);
      return synced;
    }
    if (!readLock()) {
      return runAuthRefreshOnce(refreshFn);
    }
    await sleep(120);
  }

  throw new Error("Auth refresh timeout (another tab)");
}

let ensureAccessInFlight: Promise<string | null> | null = null;

/**
 * Перед API-запросом: подхватить токен из другой вкладки или обновить refresh.
 */
export async function ensureAccessToken(): Promise<string | null> {
  if (hasValidAccessToken()) {
    return CookieUtils.getCookie("auth_token") ?? null;
  }

  const synced = readSyncedToken();
  if (synced) {
    applySyncedAccessToken(synced);
    if (hasValidAccessToken()) {
      return synced;
    }
  }

  if (!hasRefreshToken()) {
    return null;
  }

  if (ensureAccessInFlight) {
    return ensureAccessInFlight;
  }

  ensureAccessInFlight = (async () => {
    if (isAuthRefreshLocked()) {
      const ready = await waitForAuthReady(20_000);
      return ready ? (CookieUtils.getCookie("auth_token") ?? null) : null;
    }
    try {
      return await refreshAccessToken();
    } catch {
      const ready = await waitForAuthReady(20_000);
      return ready ? (CookieUtils.getCookie("auth_token") ?? null) : null;
    }
  })().finally(() => {
    ensureAccessInFlight = null;
  });

  return ensureAccessInFlight;
}

/** Один refresh на все вкладки (для axios и /auth/me). */
export async function refreshAccessToken(): Promise<string> {
  return runAuthRefreshOnce(async () => {
    const refreshToken = CookieUtils.getCookie("refresh_token");
    if (!refreshToken) {
      throw new Error("Refresh token not found");
    }

    const res = await axios.post(
      `${BASE_URL}auth/refresh/`,
      { refresh_token: refreshToken },
      { withCredentials: true },
    );

    const token = res.data?.access_token as string | undefined;
    if (!token) {
      throw new Error("Refresh response without access_token");
    }

    CookieUtils.setCookieWithToken("auth_token", token);
    return token;
  });
}

export function listenForAuthTokenSync(
  onToken: (token: string) => void,
): () => void {
  if (typeof window === "undefined") return () => undefined;

  const handler = (e: StorageEvent) => {
    if (e.key !== TOKEN_SYNC_KEY || !e.newValue) return;
    try {
      const parsed = JSON.parse(e.newValue) as { token?: string };
      if (parsed.token) {
        onToken(parsed.token);
      }
    } catch {
      /* ignore */
    }
  };

  const onChannel = (ev: MessageEvent) => {
    const data = ev.data as { type?: string } | null;
    if (data?.type === "token_ready") {
      const synced = readSyncedToken();
      if (synced) {
        onToken(synced);
      }
    }
  };

  let channel: BroadcastChannel | null = null;
  try {
    channel = new BroadcastChannel(AUTH_CHANNEL);
    channel.addEventListener("message", onChannel);
  } catch {
    channel = null;
  }

  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener("storage", handler);
    channel?.removeEventListener("message", onChannel);
    channel?.close();
  };
}
