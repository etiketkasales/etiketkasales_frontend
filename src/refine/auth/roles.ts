/**
 * Staff-роли совпадают с PHP (users.staff_role / AdminMiddleware).
 * Фактические права — строки из AdminMiddleware::permissionsMatrix(); список для текущего
 * пользователя приходит в GET /v1/auth/me как `permissions`.
 *
 * Маппинг Refine (resource + action) → набор backend-прав см. canRefineAccess — должен
 * соответствовать смыслу checkPermission() на бэке.
 */

export type AdminRole =
  | "admin"
  | "super_admin"
  | "content_moderator"
  | "support_agent"
  | "analyst";

export const ADMIN_ROLES: AdminRole[] = [
  "admin",
  "super_admin",
  "content_moderator",
  "support_agent",
  "analyst",
];

/** staff_role или legacy role из ответа /auth/me. */
export function getEffectiveAdminRole(user: {
  role?: string;
  staff_role?: string | null;
}): string {
  const s = user.staff_role;
  if (s && ADMIN_ROLES.includes(s as AdminRole)) {
    return s;
  }
  const r = user.role ?? "";
  if (ADMIN_ROLES.includes(r as AdminRole)) {
    return r;
  }
  return "";
}

/**
 * Доступ к пунктам Refine (меню, CanAccess) по списку прав с бэка.
 */
export function canRefineAccess(
  permissions: string[],
  resource: string,
  action: string,
): boolean {
  const p = new Set(permissions);
  const has = (x: string) => p.has(x);
  const hasAny = (xs: string[]) => xs.some(has);

  switch (resource) {
    case "dashboard":
      return action === "list" && has("view_dashboard");
    case "orders":
      if (action === "list") {
        return hasAny(["manage_orders", "view_orders"]);
      }
      if (action === "edit") {
        return has("manage_orders");
      }
      return false;
    case "users":
      if (action === "list") {
        return hasAny(["manage_users", "view_users"]);
      }
      if (action === "edit") {
        return has("manage_users");
      }
      return false;
    case "products":
      if (action === "list") {
        return hasAny(["manage_products", "view_products", "moderate_content"]);
      }
      if (action === "edit") {
        return hasAny(["manage_products", "moderate_content"]);
      }
      return false;
    case "permissions":
      if (action === "list" || action === "edit") {
        return hasAny(["manage_admins", "system_settings"]);
      }
      return false;
    default:
      return false;
  }
}
