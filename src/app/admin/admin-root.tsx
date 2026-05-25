"use client";

import { ReactNode } from "react";
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router";
import { ThemedLayout, useNotificationProvider } from "@refinedev/antd";
import { ConfigProvider, App as AntdApp } from "antd";
import { etiketkaDataProvider } from "~/src/refine/providers/etiketkaDataProvider";
import { adminAuthProvider } from "~/src/refine/auth/adminAuthProvider";
import { accessControlProvider } from "~/src/refine/auth/accessControlProvider";
import { AdminHeader } from "~/src/app/admin/admin-header";
import { AdminSider } from "~/src/app/admin/admin-sider";

export default function AdminRoot({ children }: { children: ReactNode }) {
  const notificationProvider = useNotificationProvider();

  return (
    <div className="etiketka-admin-root">
      <ConfigProvider>
        <AntdApp>
          <Refine
            dataProvider={etiketkaDataProvider}
            routerProvider={routerProvider}
            notificationProvider={notificationProvider}
            authProvider={adminAuthProvider}
            accessControlProvider={accessControlProvider}
            resources={[
              /* Пункты сайдера: ~/src/refine/admin/adminMenu.ts + права AdminRbac (бэк) */
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
              {
                name: "cases",
                list: "/admin/cases",
                meta: { label: "Cases" },
              },
              {
                name: "actions",
                list: "/admin/actions",
                meta: { label: "Actions" },
              },
              {
                name: "finance-sellers",
                list: "/admin/finance/sellers",
                meta: { label: "FinanceSellers" },
              },
              {
                name: "sellers-quality",
                list: "/admin/sellers/quality",
                meta: { label: "SellersQuality" },
              },
              { name: "users", list: "/admin/users", meta: { label: "Users" } },
              {
                name: "sellers",
                list: "/admin/sellers",
                meta: { label: "Sellers" },
              },
              {
                name: "products",
                list: "/admin/products",
                create: "/admin/products/new",
                edit: "/admin/products/:id",
                meta: { label: "Products" },
              },
              {
                name: "moderation-products",
                list: "/admin/moderation/products",
                meta: { label: "ModerationProducts" },
              },
              {
                name: "catalog-categories",
                list: "/admin/catalog/categories",
                meta: { label: "Categories" },
              },
              {
                name: "catalog-brands",
                list: "/admin/catalog/brands",
                meta: { label: "Brands" },
              },
              {
                name: "catalog-units",
                list: "/admin/catalog/units",
                meta: { label: "Units" },
              },
              /* Справочник матрицы прав
                 { name: "permissions", list: "/admin/permissions", meta: { label: "Права" } }, */
            ]}
            options={{
              syncWithLocation: false,
              disableTelemetry: true,
              title: { text: "Этикетка Sales" },
            }}
          >
            <ThemedLayout Header={AdminHeader} Sider={AdminSider}>
              {children}
            </ThemedLayout>
          </Refine>
        </AntdApp>
      </ConfigProvider>
    </div>
  );
}
