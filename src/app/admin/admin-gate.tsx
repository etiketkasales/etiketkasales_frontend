"use client";

import { ReactNode, useMemo } from "react";
import { Button, Card, Result, Spin, Typography } from "antd";
import { useAuthMe } from "~/src/refine/auth/useAuthMe.hook";
import { canAccessAdminPanelFromMe } from "~/src/refine/auth/roles";

export function AdminGate({ children }: { children: ReactNode }) {
  const { data, isError, error, hydrated, isPending } = useAuthMe();

  const allowed = useMemo(
    () => (data ? canAccessAdminPanelFromMe(data) : false),
    [data],
  );

  if (!hydrated || (isPending && !data)) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spin size="large" spinning tip="Загрузка…">
          <div style={{ minHeight: 120, minWidth: 120 }} />
        </Spin>
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
