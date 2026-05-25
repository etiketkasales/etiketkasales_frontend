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
import { Button, Layout, Menu, theme } from "antd";
import type { MenuProps } from "antd";
import { useLink, useLogout, useTranslate } from "@refinedev/core";
import { useThemedLayoutContext } from "@refinedev/antd";
import { ThemedTitle } from "@refinedev/antd";
import type { RefineThemedLayoutSiderProps } from "@refinedev/ui-types";
import {
  ADMIN_MENU,
  filterAdminMenuByPermissions,
  type AdminMenuEntry,
} from "~/src/refine/admin/adminMenu";
import { useAuthMe } from "~/src/refine/auth/useAuthMe.hook";

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
  const { perms, hydrated } = useAuthMe();

  const menuTree = useMemo(
    () => (hydrated ? filterAdminMenuByPermissions(ADMIN_MENU, perms) : []),
    [hydrated, perms],
  );

  const items: MenuProps["items"] = useMemo(() => {
    if (!hydrated) return [];
    return toAntdMenuItems(menuTree, Link);
  }, [menuTree, Link, hydrated]);

  const { mutate: mutateLogout } = useLogout();
  const translate = useTranslate();
  const { siderCollapsed, setSiderCollapsed, setMobileSiderOpen } =
    useThemedLayoutContext();

  const RenderToTitle = Title ?? ThemedTitle;
  const collapsed = hydrated ? siderCollapsed : false;

  const selectedKeys = useMemo(() => {
    if (!hydrated) return [] as string[];
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
  }, [pathname, menuTree, hydrated]);

  const openKeys = useMemo(
    () =>
      hydrated &&
      menuTree.some((n) => n.key === "catalog" && (n.children?.length ?? 0) > 0)
        ? ["catalog"]
        : [],
    [menuTree, hydrated],
  );

  const withLogout: MenuProps["items"] = useMemo(
    () => [
      ...(items ?? []),
      {
        key: "logout",
        icon: <LogoutOutlined />,
        label: translate("buttons.logout", "Выйти"),
        onClick: () => mutateLogout(),
      },
    ],
    [items, mutateLogout, translate],
  );

  return (
    <Layout.Sider
      style={{
        backgroundColor: token.colorBgContainer,
        borderRight: `1px solid ${token.colorBgElevated}`,
      }}
      collapsible
      collapsed={collapsed}
      onCollapse={(nextCollapsed, type) => {
        if (type === "clickTrigger") {
          setSiderCollapsed(nextCollapsed);
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
          width: collapsed ? "80px" : "260px",
          padding: collapsed ? "0" : "0 16px",
          display: "flex",
          justifyContent: collapsed ? "center" : "flex-start",
          alignItems: "center",
          height: "64px",
          backgroundColor: token.colorBgElevated,
          fontSize: "14px",
        }}
      >
        <RenderToTitle collapsed={collapsed} />
      </div>
      <Menu
        mode="inline"
        selectedKeys={selectedKeys}
        openKeys={openKeys}
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
