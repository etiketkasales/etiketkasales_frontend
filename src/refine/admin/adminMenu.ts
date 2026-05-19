/**
 * Дерево левого меню админки. Сопоставление с правами (строки из /auth/me).
 * Добавляйте пункты здесь и при необходимости — ключи в AdminRbac::PERMISSIONS_META + матрицу ролей на бэке.
 */
export type AdminMenuEntry = {
  key: string;
  label: string;
  /** Только у листьев */
  path?: string;
  /** Нужно право из списка permissions */
  permission?: string;
  children?: AdminMenuEntry[];
};

export const ADMIN_MENU: AdminMenuEntry[] = [
  {
    key: "dashboard",
    label: "Дашборд",
    path: "/admin/dashboard",
    permission: "admin.dashboard.view",
  },
  {
    key: "users",
    label: "Пользователи",
    path: "/admin/users",
    permission: "admin.users.view",
  },
  {
    key: "sellers",
    label: "Продавцы",
    path: "/admin/sellers",
    permission: "admin.users.view",
  },
  {
    key: "catalog",
    label: "Каталог",
    children: [
      {
        key: "catalog-products",
        label: "Товары",
        path: "/admin/products",
        permission: "admin.catalog.products.view",
      },
      {
        key: "catalog-moderation",
        label: "Модерация товаров",
        path: "/admin/moderation/products",
        permission: "admin.moderation.view",
      },
      {
        key: "catalog-categories",
        label: "Категории",
        path: "/admin/catalog/categories",
        permission: "admin.catalog.categories.view",
      },
    ],
  },
  {
    key: "orders",
    label: "Заказы",
    path: "/admin/orders",
    permission: "admin.orders.view",
  },
  {
    key: "cases",
    label: "Возвраты и обращения",
    path: "/admin/cases",
    permission: "admin.orders.view",
  },
  {
    key: "actions",
    label: "Журнал действий",
    path: "/admin/actions",
    permission: "admin.audit.view",
  },
  {
    key: "finance",
    label: "Финансы продавцов",
    path: "/admin/finance/sellers",
    permission: "admin.finance.view",
  },
  {
    key: "sellers-quality",
    label: "SLA и нарушения",
    path: "/admin/sellers/quality",
    permission: "admin.logistics.view",
  },
];

export function filterAdminMenuByPermissions(
  nodes: AdminMenuEntry[],
  permissions: readonly string[],
): AdminMenuEntry[] {
  const set = new Set(permissions);
  const walk = (list: AdminMenuEntry[]): AdminMenuEntry[] => {
    const out: AdminMenuEntry[] = [];
    for (const n of list) {
      if (n.children?.length) {
        const children = walk(n.children);
        if (children.length > 0) {
          out.push({ ...n, children });
        }
        continue;
      }
      if (n.path) {
        if (!n.permission || set.has(n.permission)) {
          out.push(n);
        }
      }
    }
    return out;
  };
  return walk(nodes);
}
