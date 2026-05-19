"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import {
  AppstoreOutlined,
  DashboardOutlined,
  LogoutOutlined,
  SafetyCertificateOutlined,
  ShoppingCartOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";

import type { MenuProps } from "antd";
import { Button, Layout, Menu, theme } from "antd";
import { useQuery } from "@tanstack/react-query";
import {
  useIsExistAuthentication,
  useLink,
  useLogout,
  useTranslate,
} from "@refinedev/core";
import { ThemedTitle, useThemedLayoutContext } from "@refinedev/antd";
import type { RefineThemedLayoutSiderProps } from "@refinedev/ui-types";
import {
  ADMIN_MENU,
  type AdminMenuEntry,
  filterAdminMenuByPermissions,
} from "~/src/refine/admin/adminMenu";
import { getAuthMeCached } from "~/src/refine/auth/authMeCache";

function menuIconForKey(key: string) {
  switch (key) {
    case "dashboard":
      return <DashboardOutlined />;
    case "users":
      return <UserOutlined />;
    case "catalog":
    case "catalog-products":
      return <AppstoreOutlined />;
    case "orders":
      return <ShoppingCartOutlined />;
    case "cases":
      return <SafetyCertificateOutlined />;
    case "permissions":
    case "actions":
      return <SafetyCertificateOutlined />;
    default:
      return <UnorderedListOutlined />;
  }
}

function toAntdMenuItems(
  nodes: AdminMenuEntry[],
  Link: ReturnType<typeof useLink>,
): MenuProps["items"] {
  return nodes.map((n) => {
    if (n.children?.length) {
      return {
        key: n.key,
        icon: menuIconForKey(n.key),
        label: n.label,
        children: toAntdMenuItems(n.children, Link),
      };
    }
    const to = n.path ?? "/admin";
    return {
      key: to,
      icon: menuIconForKey(n.key),
      label: <Link to={to}>{n.label}</Link>,
    };
  });
}

export function AdminSider({ Title }: RefineThemedLayoutSiderProps) {
  const { token } = theme.useToken();
  const Link = useLink();
  const pathname = usePathname() ?? "";
  const { data: me } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: () => getAuthMeCached(),
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const perms = me?.permissions ?? [];

  const menuTree = useMemo(
    () => filterAdminMenuByPermissions(ADMIN_MENU, perms),
    [perms],
  );

  const items: MenuProps["items"] = useMemo(() => {
    return toAntdMenuItems(menuTree, Link);
  }, [menuTree, Link]);

  const { mutate: mutateLogout } = useLogout();
  const translate = useTranslate();
  const isExistAuthentication = useIsExistAuthentication();
  const { siderCollapsed, setSiderCollapsed, setMobileSiderOpen } =
    useThemedLayoutContext();

  const RenderToTitle = Title ?? ThemedTitle;

  const selectedKeys = useMemo(() => {
    const flat: string[] = [];
    const walk = (nodes: AdminMenuEntry[]) => {
      for (const n of nodes) {
        if (n.children?.length) {
          walk(n.children);
        } else if (n.path) {
          flat.push(n.path);
        }
      }
    };
    walk(menuTree);
    const hit = flat
      .filter((p) => pathname === p || pathname.startsWith(`${p}/`))
      .sort((a, b) => b.length - a.length)[0];
    return hit ? [hit] : [];
  }, [pathname, menuTree]);

  const defaultOpenKeys = useMemo(
    () =>
      menuTree.some((n) => n.key === "catalog" && (n.children?.length ?? 0) > 0)
        ? ["catalog"]
        : [],
    [menuTree],
  );

  const withLogout: MenuProps["items"] = useMemo(
    () => [
      ...(items ?? []),
      ...(isExistAuthentication
        ? [
            {
              key: "logout",
              icon: <LogoutOutlined />,
              label: translate("buttons.logout", "Выйти"),
              onClick: () => mutateLogout(),
            },
          ]
        : []),
    ],
    [items, isExistAuthentication, mutateLogout, translate],
  );

  return (
    <Layout.Sider
      style={{
        backgroundColor: token.colorBgContainer,
        borderRight: `1px solid ${token.colorBgElevated}`,
      }}
      collapsible
      collapsed={siderCollapsed}
      onCollapse={(collapsed, type) => {
        if (type === "clickTrigger") {
          setSiderCollapsed(collapsed);
        }
      }}
      collapsedWidth={80}
      width={260}
      breakpoint="lg"
      trigger={
        <Button
          type="text"
          style={{
            borderRadius: 0,
            height: "100%",
            width: "100%",
            backgroundColor: token.colorBgElevated,
          }}
        />
      }
    >
      <div
        style={{
          width: siderCollapsed ? "80px" : "260px",
          padding: siderCollapsed ? "0" : "0 16px",
          display: "flex",
          justifyContent: siderCollapsed ? "center" : "flex-start",
          alignItems: "center",
          height: "64px",
          backgroundColor: token.colorBgElevated,
          fontSize: "14px",
        }}
      >
        <RenderToTitle collapsed={siderCollapsed} />
      </div>
      <Menu
        mode="inline"
        selectedKeys={selectedKeys}
        defaultOpenKeys={defaultOpenKeys}
        style={{
          paddingTop: 8,
          border: "none",
          overflow: "auto",
          height: "calc(100% - 72px)",
        }}
        items={withLogout}
        onClick={() => setMobileSiderOpen(false)}
      />
    </Layout.Sider>
  );
}
