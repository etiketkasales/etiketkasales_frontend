"use client";

import { useMemo } from "react";
import {
  CheckOutlined,
  CloseOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { Alert, Card, Descriptions, Space, Table, Tag, Typography } from "antd";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "~/src/shared/lib/api/client.api";
import { ADMIN_ROLES } from "~/src/refine/auth/roles";
import { getAuthMeCached } from "~/src/refine/auth/authMeCache";

type MatrixResponse = {
  success: boolean;
  data?: Record<string, string[]>;
};

export default function AdminPermissionsPage() {
  const { data: me } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: () => getAuthMeCached(),
  });

  const { data: matrixRes, isLoading } = useQuery({
    queryKey: ["admin", "permissions-matrix"],
    queryFn: async () => {
      const { data } = await apiClient.get<MatrixResponse>(
        "/admin/permissions-matrix",
      );
      return data;
    },
  });

  const matrix = matrixRes?.success ? matrixRes.data : undefined;

  const allPermissions = useMemo(() => {
    const s = new Set<string>();
    if (matrix) {
      Object.values(matrix).forEach((arr) => arr.forEach((p) => s.add(p)));
    }
    return [...s].sort((a, b) => a.localeCompare(b));
  }, [matrix]);

  const dataSource = useMemo(
    () =>
      ADMIN_ROLES.map((role) => ({
        key: role,
        role,
        permSet: new Set(matrix?.[role] ?? []),
      })),
    [matrix],
  );

  const columns = useMemo(
    () => [
      {
        title: "Роль",
        dataIndex: "role",
        fixed: "left" as const,
        width: 160,
        render: (role: string) => (
          <Typography.Text code>{role}</Typography.Text>
        ),
      },
      ...allPermissions.map((perm) => ({
        title: perm,
        align: "center" as const,
        width: 96,
        render: (_: unknown, row: { permSet: Set<string> }) =>
          row.permSet.has(perm) ? (
            <CheckOutlined style={{ color: "#52c41a" }} aria-label="да" />
          ) : (
            <CloseOutlined style={{ color: "#d9d9d9" }} aria-label="нет" />
          ),
      })),
    ],
    [allPermissions],
  );

  return (
    <Space direction="vertical" size={16} style={{ width: "100%" }}>
      <Alert
        type="info"
        showIcon
        message="Кто может что делать в админке"
        description={
          <Typography.Paragraph style={{ marginBottom: 0 }}>
            В системе нет отдельного списка «галочек» на каждого человека:
            доступ задаётся{" "}
            <Typography.Text strong>ролью сотрудника</Typography.Text>{" "}
            (например, модератор, поддержка). Сменить роль пользователю может
            администратор на вкладке «Users» в колонке «Роль в админке».
          </Typography.Paragraph>
        }
      />

      <Card size="small">
        <Space align="start" size={12}>
          <SafetyCertificateOutlined
            style={{ fontSize: 22, color: "#1677ff", marginTop: 4 }}
          />
          <div style={{ flex: 1 }}>
            <Typography.Text
              type="secondary"
              style={{ display: "block", marginBottom: 8 }}
            >
              Ваша текущая сессия
            </Typography.Text>
            <Descriptions column={1} size="small" colon={false}>
              <Descriptions.Item label="Роль в админке">
                <Tag color="blue">{me?.user.staff_role ?? "не задана"}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Права (как отдал сервер)">
                {me?.permissions?.length ? (
                  <Space size={[4, 4]} wrap>
                    {me.permissions.map((p) => (
                      <Tag key={p} color="default">
                        {p}
                      </Tag>
                    ))}
                  </Space>
                ) : (
                  <Typography.Text type="secondary">нет данных</Typography.Text>
                )}
              </Descriptions.Item>
            </Descriptions>
          </div>
        </Space>
      </Card>

      <Card title="Справочник: какие права у какой роли" size="small">
        <Typography.Paragraph type="secondary" style={{ marginTop: 0 }}>
          Таблица только для ознакомления. Изменение матрицы — в коде сервера
          (отдельная задача).
        </Typography.Paragraph>
        <Table
          loading={isLoading}
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          scroll={{ x: Math.min(400 + allPermissions.length * 96, 2000) }}
          size="small"
        />
      </Card>
    </Space>
  );
}
