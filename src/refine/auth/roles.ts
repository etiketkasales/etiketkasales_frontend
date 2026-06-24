/**
 * Staff-роли = users.staff_role (бэкенд). Права — строки из App\Config\AdminRbac,
 * отдаются в GET /v1/auth/me как `permissions`.
 *
 * Маппинг Refine (resource + action) → право: {@see canRefineAccess}
 */

export type AdminRole =
  | "admin"
  | "super_admin"
  | "content_moderator"
  | "support_agent"
  | "analyst"
  | "financier"
  | "logistic";

export const ADMIN_ROLES: AdminRole[] = [
  "admin",
  "super_admin",
  "content_moderator",
  "support_agent",
  "analyst",
  "financier",
  "logistic",
];

/** staff_role или legacy role из ответа /auth/me. */
/**
 * Доступ в админ-раздел: есть хотя бы одно право из /auth/me ИЛИ витринная/legacy роль из матрицы staff.
 * Используйте для гейта /admin и ссылки «Админ-панель» (надёжнее, чем только Redux-профиль без staff_role).
 */
export function canAccessAdminPanelFromMe(payload: {
  user: { role?: string; staff_role?: string | null };
  permissions: readonly string[];
}): boolean {
  if ((payload.user.role ?? "") === "seller") {
    return false;
  }
  if (payload.permissions.length > 0) {
    return true;
  }
  return Boolean(getEffectiveAdminRole(payload.user));
}

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
 * Доступ Refine (ресурс + действие) по плоскому списку прав с бэка.
 * Должен совпадать с маршрутами и меню (admin.*).
 */
export function canRefineAccess(
  permissions: string[],
  resource: string,
  action: string,
): boolean {
  const p = new Set(permissions);
  const has = (x: string) => p.has(x);

  switch (resource) {
    case "dashboard":
      return action === "list" && has("admin.dashboard.view");
    case "orders":
    case "cases":
      if (action === "list") {
        return has("admin.orders.view");
      }
      if (action === "edit") {
        return has("admin.orders.edit");
      }
      return false;
    case "users":
    case "sellers":
      if (action === "list") {
        return has("admin.users.view");
      }
      if (action === "edit") {
        return has("admin.users.edit");
      }
      return false;
    case "products":
      if (action === "list") {
        return has("admin.catalog.products.view");
      }
      if (action === "edit") {
        return has("admin.catalog.products.edit");
      }
      return false;
    case "moderation-products":
      if (action === "list") {
        return has("admin.moderation.view");
      }
      if (action === "edit") {
        return has("admin.moderation.edit");
      }
      return false;
    case "catalog-categories":
      if (action === "list") {
        return has("admin.catalog.categories.view");
      }
      if (action === "edit") {
        return has("admin.catalog.categories.edit");
      }
      return false;
    case "catalog-brands":
      if (action === "list") {
        return has("admin.catalog.brands.view");
      }
      if (action === "edit") {
        return has("admin.catalog.brands.edit");
      }
      return false;
    case "catalog-units":
      if (action === "list") {
        return has("admin.catalog.units.view");
      }
      if (action === "edit") {
        return has("admin.catalog.units.edit");
      }
      return false;
    case "permissions":
      if (action === "list" || action === "edit") {
        return has("admin.system.matrix_view");
      }
      return false;
    case "actions":
      if (action === "list") {
        return has("admin.audit.view");
      }
      return false;
    case "finance-sellers":
      if (action === "list") {
        return has("admin.finance.view");
      }
      return false;
    case "sellers-quality":
      if (action === "list") {
        return has("admin.logistics.view");
      }
      return false;
    case "reviews":
      if (action === "list") {
        return has("admin.reviews.view");
      }
      if (action === "edit") {
        return has("admin.reviews.edit");
      }
      return false;
    default:
      return false;
  }
}
