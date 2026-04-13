"use client";

import { ReactNode, useMemo } from "react";
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router";
import { ThemedLayout, useNotificationProvider } from "@refinedev/antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider, App as AntdApp } from "antd";
import "@refinedev/antd/dist/reset.css";
import { etiketkaDataProvider } from "~/src/refine/providers/etiketkaDataProvider";
import { authProvider } from "~/src/refine/auth/authProvider";
import { accessControlProvider } from "~/src/refine/auth/accessControlProvider";
import { AdminHeader } from "~/src/app/admin/admin-header";
import { AdminSider } from "~/src/app/admin/admin-sider";

export default function AdminRoot({ children }: { children: ReactNode }) {
  const queryClient = useMemo(() => new QueryClient(), []);
  const notificationProvider = useNotificationProvider();

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider>
        <AntdApp>
          <Refine
            dataProvider={etiketkaDataProvider}
            routerProvider={routerProvider}
            notificationProvider={notificationProvider}
            authProvider={authProvider}
            accessControlProvider={accessControlProvider}
            resources={[
              {
                name: "dashboard",
                list: "/admin/dashboard",
                meta: { label: "Dashboard" },
              },
              {
                name: "orders",
                list: "/admin/orders",
                meta: { label: "Orders" },
              },
              { name: "users", list: "/admin/users", meta: { label: "Users" } },
              {
                name: "products",
                list: "/admin/products",
                meta: { label: "Products" },
              },
              /* Справочник матрицы прав
                 { name: "permissions", list: "/admin/permissions", meta: { label: "Права" } }, */
            ]}
            options={{
              syncWithLocation: true,
              title: { text: "Этикетка Sales" },
            }}
          >
            <ThemedLayout Header={AdminHeader} Sider={AdminSider}>
              {children}
            </ThemedLayout>
          </Refine>
        </AntdApp>
      </ConfigProvider>
    </QueryClientProvider>
  );
}
