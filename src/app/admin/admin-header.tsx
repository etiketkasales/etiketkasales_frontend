"use client";

import type { RefineThemedLayoutHeaderProps } from "@refinedev/ui-types";
import { useGetIdentity } from "@refinedev/core";
import { ArrowLeftOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Layout as AntdLayout,
  Space,
  Typography,
  theme,
} from "antd";
import { useRouter } from "next/navigation";
import { LAST_PUBLIC_PATH_KEY } from "~/src/app/public-path-recorder";
import React from "react";

function leaveAdmin(router: ReturnType<typeof useRouter>) {
  if (typeof window === "undefined") return;

  const last = sessionStorage.getItem(LAST_PUBLIC_PATH_KEY);
  if (last && last.startsWith("/") && !last.startsWith("/admin")) {
    router.push(last);
    return;
  }

  if (window.history.length > 1) {
    router.back();
    return;
  }

  router.push("/");
}

export function AdminHeader({ sticky }: RefineThemedLayoutHeaderProps) {
  const router = useRouter();
  const { token } = theme.useToken();
  const { data: user } = useGetIdentity();

  const headerStyles: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 24px",
    height: 64,
    gap: 16,
  };
  if (sticky) {
    headerStyles.position = "sticky";
    headerStyles.top = 0;
    headerStyles.zIndex = 1;
  }

  return (
    <AntdLayout.Header style={headerStyles}>
      <Button
        type="text"
        icon={<ArrowLeftOutlined />}
        onClick={() => leaveAdmin(router)}
      >
        Назад
      </Button>
      <Space size="middle">
        {user?.name ? (
          <Typography.Text strong>{user.name}</Typography.Text>
        ) : null}
        {user?.avatar ? <Avatar src={user.avatar} alt={user.name} /> : null}
      </Space>
    </AntdLayout.Header>
  );
}
