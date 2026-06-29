/** Origin API из env (без хрупкого regex по /v1). */
export function apiPublicOrigin(): string {
  const raw =
    process.env.NEXT_PUBLIC_API_URL?.trim() ||
    process.env.SERVER_API_URL?.trim() ||
    "";
  if (!raw) return "";
  try {
    return new URL(raw).origin;
  } catch {
    return "";
  }
}

/** Только для браузера — NEXT_PUBLIC, чтобы не подставлять docker-хост с SSR. */
export function apiBrowserOrigin(): string {
  const raw = process.env.NEXT_PUBLIC_API_URL?.trim() || "";
  if (!raw) return "";
  try {
    return new URL(raw).origin;
  } catch {
    return "";
  }
}

function uploadPathFromPathname(pathname: string): string | null {
  if (pathname.startsWith("/uploads/")) {
    return pathname;
  }
  if (pathname.startsWith("/u/uploads/")) {
    return `/uploads/${pathname.slice("/u/uploads/".length)}`;
  }
  return null;
}

/**
 * Абсолютный URL для отображения /uploads/...
 * Исправляет legacy-пути /u/uploads и подставляет origin из env.
 */
export function resolveUploadMediaUrl(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return trimmed;

  const browserOrigin = apiBrowserOrigin() || apiPublicOrigin();

  if (trimmed.startsWith("/")) {
    const path = uploadPathFromPathname(trimmed);
    if (!path) return trimmed;
    return browserOrigin ? `${browserOrigin}${path}` : path;
  }

  try {
    const u = new URL(trimmed);
    const path = uploadPathFromPathname(u.pathname);
    if (!path) return trimmed;
    const origin = browserOrigin || u.origin;
    return `${origin}${path}${u.search}`;
  } catch {
    return trimmed;
  }
}

/** Для PUT/POST: только относительный /uploads/..., без дублей с битым абсолютным URL. */
export function normalizeProductImagePathForApi(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return trimmed;

  if (trimmed.startsWith("/")) {
    const path = uploadPathFromPathname(trimmed);
    return path ?? trimmed;
  }

  try {
    const path = uploadPathFromPathname(new URL(trimmed).pathname);
    if (path) return path;
  } catch {
    /* keep as-is */
  }

  return trimmed;
}

export function pickProductImageUrl(images?: string[]): string {
  if (!images?.length) return "";

  const seen = new Set<string>();
  for (const raw of images) {
    const resolved = resolveUploadMediaUrl(raw);
    if (!resolved || seen.has(resolved)) continue;
    seen.add(resolved);
    return resolved;
  }

  return resolveUploadMediaUrl(images[0]);
}

export function normalizeProductImagesForApi(images: string[]): string[] {
  const out: string[] = [];
  const seen = new Set<string>();

  for (const url of images) {
    const path = normalizeProductImagePathForApi(url);
    if (!path || seen.has(path)) continue;
    seen.add(path);
    out.push(path);
  }

  return out;
}
