import { useCallback, useMemo } from "react";

interface Props {
  src: string;
}

/** Origin API для сборки URL (SSR: может быть SERVER_API_URL). */
function mediaOriginFromEnv(): string {
  const base =
    process.env.NEXT_PUBLIC_API_URL?.trim() ||
    process.env.SERVER_API_URL?.trim() ||
    "";
  if (!base) return "";
  return base.replace(/\/v1\/?$/i, "").replace(/\/+$/, "");
}

/**
 * Только NEXT_PUBLIC — тот же хост:порт, с которого браузер ходит в API.
 * Нужен, чтобы поправить абсолютные URL после SSR: PHP подставляет HTTP_HOST
 * из запроса сервера Next (например http://api:8000/uploads/...), браузер
 * такой хост не открывает.
 */
function publicBrowserOrigin(): string {
  const base = process.env.NEXT_PUBLIC_API_URL?.trim() || "";
  if (!base) return "";
  return base.replace(/\/v1\/?$/i, "").replace(/\/+$/, "");
}

/** Относительные /uploads/... иначе уходят на origin Next.js и не открываются */
function absolutizeUploadsPath(path: string): string {
  if (!path.startsWith("/uploads/")) return path;
  const origin = mediaOriginFromEnv();
  if (!origin) return path;
  return `${origin}${path}`;
}

/**
 * http://api:8000/uploads/... → http://localhost:8000/uploads/... (если задан NEXT_PUBLIC_API_URL).
 */
function coerceUploadsToPublicOrigin(url: string): string {
  const target = publicBrowserOrigin();
  if (!target) return url;
  try {
    const u = new URL(url);
    if (!u.pathname.startsWith("/uploads/")) return url;
    const o = new URL(target);
    if (u.origin === o.origin) return url;
    return `${o.origin}${u.pathname}${u.search}`;
  } catch {
    return url;
  }
}

function normalizeMediaUrl(url: string): string {
  return coerceUploadsToPublicOrigin(url);
}

function isRenderableSrc(src: string | undefined): boolean {
  if (!src) return false;
  const t = src.trim();
  if (!t || t === "null" || t === "undefined") return false;
  return true;
}

export const useImageWrapper = ({ src }: Props) => {
  const canLoad = useMemo(() => isRenderableSrc(src), [src]);

  const safeImageSrc = useCallback(
    (fallbackImage: string, src?: string): string => {
      if (!src) return fallbackImage;

      const trimmed = src.trim();

      if (!trimmed) return fallbackImage;
      if (trimmed === "null" || trimmed === "undefined") return fallbackImage;

      if (trimmed.startsWith("/")) {
        return normalizeMediaUrl(absolutizeUploadsPath(trimmed));
      }

      try {
        new URL(trimmed);
        return normalizeMediaUrl(trimmed);
      } catch {
        return fallbackImage;
      }
    },
    [],
  );

  return {
    canLoad,
    safeImageSrc,
  };
};
