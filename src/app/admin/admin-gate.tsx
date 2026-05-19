"use client";

import { ReactNode, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button, Card, Result, Spin, Typography } from "antd";
import { getAuthMeCached } from "~/src/refine/auth/authMeCache";
import { canAccessAdminPanelFromMe } from "~/src/refine/auth/roles";

export function AdminGate({ children }: { children: ReactNode }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: () => getAuthMeCached(),
    retry: false,
  });

  const allowed = useMemo(
    () => (data ? canAccessAdminPanelFromMe(data) : false),
    [data],
  );

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div style={{ padding: 24 }}>
        <Result
          status="403"
          title="Нужна авторизация"
          subTitle={
            error instanceof Error
              ? error.message
              : "Войдите в аккаунт сотрудника, чтобы открыть админ-панель."
          }
          extra={
            <Button type="primary" href="/login">
              На страницу входа
            </Button>
          }
        />
      </div>
    );
  }

  if (!allowed) {
    return (
      <div style={{ padding: 24, maxWidth: 560, margin: "0 auto" }}>
        <Card>
          <Typography.Title level={4} style={{ marginTop: 0 }}>
            Нет доступа к админ-панели
          </Typography.Title>
          <Typography.Paragraph type="secondary">
            У этой учётной записи нет staff-роли и прав администратора. Если вам
            выдали доступ — обновите страницу или выйдите и войдите снова.
          </Typography.Paragraph>
          <Button type="primary" href="/">
            На главную
          </Button>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}
