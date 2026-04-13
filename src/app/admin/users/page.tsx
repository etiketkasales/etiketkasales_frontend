"use client";

import type { TableProps } from "antd";
import {
  Button,
  Card,
  Input,
  Select,
  Space,
  Table,
  Tag,
  Typography,
  message,
} from "antd";
import { getDefaultFilter, getDefaultSortOrder } from "@refinedev/antd";
import { apiClient } from "~/src/shared/lib/api/client.api";
import { ADMIN_ROLES } from "~/src/refine/auth/roles";
import { useAdminTable } from "~/src/refine/admin/useAdminTable";
import { useRefineSearchFilterValue } from "~/src/refine/admin/useRefineSearchFilterValue";

type UserRow = {
  id: number;
  name: string | null;
  surname?: string | null;
  phone: string | null;
  email: string | null;
  role: string;
  staff_role?: string | null;
  status?: string;
  blocked_reason?: string | null;
  created_at: string;
};

const MARKETPLACE_ROLES = ["buyer", "seller"] as const;
const STATUSES = ["active", "inactive", "blocked"];

export default function AdminUsersPage() {
  const {
    tableProps,
    setFilters,
    filters,
    sorters,
    tableQuery,
    hiddenSearchForm,
  } = useAdminTable({
    resource: "users",
    syncWithLocation: true,
  });

  const search = useRefineSearchFilterValue(filters);

  return (
    <Space direction="vertical" size={16} style={{ width: "100%" }}>
      {hiddenSearchForm}
      <Card>
        <Space>
          <Typography.Text strong>Поиск</Typography.Text>
          <Input.Search
            allowClear
            value={search}
            placeholder="Имя / фамилия / email / телефон"
            onChange={(e) =>
              setFilters(
                [
                  {
                    field: "search",
                    operator: "contains",
                    value: e.target.value || undefined,
                  },
                ],
                "merge",
              )
            }
            style={{ width: 320 }}
          />
        </Space>
      </Card>
      <Table<UserRow>
        {...(tableProps as TableProps<UserRow>)}
        rowKey="id"
        pagination={{ ...tableProps.pagination, showSizeChanger: true }}
      >
        <Table.Column<UserRow>
          key="id"
          dataIndex="id"
          title="ID"
          sorter
          width={72}
          defaultSortOrder={getDefaultSortOrder("id", sorters)}
        />
        <Table.Column<UserRow>
          key="name"
          dataIndex="name"
          title="Имя"
          sorter
          ellipsis
        />
        <Table.Column<UserRow>
          key="surname"
          dataIndex="surname"
          title="Фамилия"
          sorter
          ellipsis
        />
        <Table.Column<UserRow> dataIndex="phone" title="Телефон" width={140} />
        <Table.Column<UserRow> dataIndex="email" title="Email" ellipsis />
        <Table.Column<UserRow>
          key="role"
          dataIndex="role"
          title="Роль (витрина)"
          width={100}
          filters={MARKETPLACE_ROLES.map((r) => ({ text: r, value: r }))}
          filteredValue={getDefaultFilter("role", filters, "eq")}
          render={(v: string) => <Tag color="blue">{v}</Tag>}
        />
        <Table.Column<UserRow>
          dataIndex="staff_role"
          title="Роль в админке"
          width={150}
          render={(v?: string | null) =>
            v ? <Tag color="purple">{v}</Tag> : <span>—</span>
          }
        />
        <Table.Column<UserRow>
          title="Статус"
          width={200}
          render={(_, record) => (
            <Space direction="vertical" size={0}>
              <Tag color={record.status === "blocked" ? "red" : "green"}>
                {record.status || "active"}
              </Tag>
              {record.status === "blocked" && record.blocked_reason ? (
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                  {record.blocked_reason}
                </Typography.Text>
              ) : null}
            </Space>
          )}
        />
        <Table.Column<UserRow>
          key="created_at"
          dataIndex="created_at"
          title="Создан"
          sorter
          width={120}
        />
        <Table.Column<UserRow>
          title="Действия"
          width={340}
          fixed="right"
          render={(_, record) => (
            <Space wrap>
              <Select
                size="small"
                style={{ width: 100 }}
                value={record.role}
                options={MARKETPLACE_ROLES.map((r) => ({ label: r, value: r }))}
                onChange={async (value) => {
                  try {
                    await apiClient.put(`/admin/users/${record.id}`, {
                      role: value,
                    });
                    message.success(`Роль витрины: ${value}`);
                    await tableQuery.refetch();
                  } catch (e) {
                    message.error(e instanceof Error ? e.message : "Ошибка");
                  }
                }}
              />
              <Select
                size="small"
                style={{ width: 160 }}
                placeholder="Роль в админке"
                value={record.staff_role ?? ""}
                options={[
                  { label: "— нет —", value: "" },
                  ...ADMIN_ROLES.map((r) => ({ label: r, value: r })),
                ]}
                onChange={async (value) => {
                  try {
                    await apiClient.put(`/admin/users/${record.id}`, {
                      staff_role: value === "" ? null : value,
                    });
                    message.success("Админ-роль обновлена");
                    await tableQuery.refetch();
                  } catch (e) {
                    message.error(e instanceof Error ? e.message : "Ошибка");
                  }
                }}
              />
              <Select
                size="small"
                style={{ width: 120 }}
                value={record.status || "active"}
                options={STATUSES.map((s) => ({ label: s, value: s }))}
                onChange={async (value) => {
                  try {
                    await apiClient.put(`/admin/users/${record.id}`, {
                      status: value,
                    });
                    message.success(`Статус: ${value}`);
                    await tableQuery.refetch();
                  } catch (e) {
                    message.error(e instanceof Error ? e.message : "Ошибка");
                  }
                }}
              />
              <Button
                size="small"
                danger
                onClick={async () => {
                  try {
                    await apiClient.put(`/admin/users/${record.id}`, {
                      status: "blocked",
                      blocked_reason: "Блокировка из админки",
                    });
                    message.success("Заблокирован");
                    await tableQuery.refetch();
                  } catch (e) {
                    message.error(e instanceof Error ? e.message : "Ошибка");
                  }
                }}
              >
                Блок
              </Button>
            </Space>
          )}
        />
      </Table>
    </Space>
  );
}
