export type HeaderUserLike = {
  id: number;
  name?: string | null;
  surname?: string | null;
  phone?: string;
  staff_role?: string | null;
};

const STAFF_SLUGS = new Set([
  "admin",
  "super_admin",
  "content_moderator",
  "support_agent",
  "analyst",
  "buyer",
  "seller",
]);

function normalizeSlug(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, "_");
}

/** Имя для шапки: не подставляем staff_role вместо имени (старые данные / кэш). */
export function getHeaderDisplayName(user: HeaderUserLike): string {
  const rawName = (user.name ?? "").trim();
  const rawSurname = (user.surname ?? "").trim();
  const full = [rawName, rawSurname].filter(Boolean).join(" ").trim();

  const staff = user.staff_role ? normalizeSlug(user.staff_role) : "";
  const nameNorm = normalizeSlug(rawName);
  const fullNorm = normalizeSlug(full);

  const looksLikeStaffSlug =
    (staff && (nameNorm === staff || fullNorm === staff)) ||
    STAFF_SLUGS.has(nameNorm) ||
    STAFF_SLUGS.has(fullNorm);

  if (full && !looksLikeStaffSlug) return full;
  if (rawName && !looksLikeStaffSlug) return rawName;
  if (user.phone) return user.phone;
  return `Пользователь ${user.id}`;
}
