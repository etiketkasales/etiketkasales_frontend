"use client";

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
import {
  CanAccess,
  useIsExistAuthentication,
  useLink,
  useLogout,
  useMenu,
  useTranslate,
} from "@refinedev/core";
import { useThemedLayoutContext } from "@refinedev/antd";
import { ThemedTitle } from "@refinedev/antd";
import type { RefineThemedLayoutSiderProps } from "@refinedev/ui-types";

function menuIconForResource(name: string | undefined) {
  switch (name) {
    case "dashboard":
      return <DashboardOutlined />;
    case "orders":
      return <ShoppingCartOutlined />;
    case "users":
      return <UserOutlined />;
    case "products":
      return <AppstoreOutlined />;
    case "permissions":
      return <SafetyCertificateOutlined />;
    default:
      return <UnorderedListOutlined />;
  }
}

export function AdminSider({ Title }: RefineThemedLayoutSiderProps) {
  const { token } = theme.useToken();
  const Link = useLink();
  const { menuItems, selectedKey, defaultOpenKeys } = useMenu();
  const { mutate: mutateLogout } = useLogout();
  const translate = useTranslate();
  const isExistAuthentication = useIsExistAuthentication();
  const { siderCollapsed, setSiderCollapsed, setMobileSiderOpen } =
    useThemedLayoutContext();

  const RenderToTitle = Title ?? ThemedTitle;

  const items: MenuProps["items"] = [
    ...menuItems.map((item) => ({
      key: item.key,
      icon: menuIconForResource(item.name),
      label: (
        <CanAccess
          resource={item.name}
          action="list"
          params={{ resource: item }}
        >
          <Link to={item.list ?? ""}>
            {(item.meta as { label?: string } | undefined)?.label ??
              item.label ??
              item.name}
          </Link>
        </CanAccess>
      ),
    })),
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
  ];

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
          width: siderCollapsed ? "80px" : "200px",
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
        selectedKeys={selectedKey ? [selectedKey] : []}
        defaultOpenKeys={[...defaultOpenKeys]}
        style={{
          paddingTop: 8,
          border: "none",
          overflow: "auto",
          height: "calc(100% - 72px)",
        }}
        items={items}
        onClick={() => setMobileSiderOpen(false)}
      />
    </Layout.Sider>
  );
}
