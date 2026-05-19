"use client";

import { useMemo, useState } from "react";
import type { TableProps } from "antd";
import {
  Alert,
  Button,
  Card,
  Descriptions,
  Drawer,
  Input,
  Select,
  Space,
  Table,
  Tag,
  Typography,
  message,
} from "antd";
import { useQuery } from "@tanstack/react-query";
import { getDefaultFilter, getDefaultSortOrder } from "@refinedev/antd";
import { apiClient } from "~/src/shared/lib/api/client.api";
import { ADMIN_ROLES } from "~/src/refine/auth/roles";
import { getAuthMeCached } from "~/src/refine/auth/authMeCache";
import { useAdminTable } from "~/src/refine/admin/useAdminTable";
import { useRefineSearchFilterValue } from "~/src/refine/admin/useRefineSearchFilterValue";
import {
  AdminActionSection,
  AdminActionSurface,
} from "~/src/features/admin/ui/admin-action-surface";

type UserRow = {
  id: number;
  name: string | null;
  surname?: string | null;
  phone: string | null;
  email: string | null;
  phone_verified_at?: string | null;
  email_verified_at?: string | null;
  role: string;
  staff_role?: string | null;
  status?: string;
  blocked_reason?: string | null;
  created_at: string;
  /** См. AdminController::resolveActivitySegment */
  activity_segment?: string;
  orders_count?: number;
};
type UserProfileData = {
  user: Record<string, any>;
  orders: Array<Record<string, any>>;
  admin_actions: Array<Record<string, any>>;
  stats?: {
    orders_total?: number;
    orders_amount?: number;
    last_order_at?: string | null;
    activity_segment?: string;
  };
  returns?: Array<Record<string, any>>;
  appeals?: Array<Record<string, any>>;
};

const MARKETPLACE_ROLES = ["buyer", "seller"] as const;
const STATUSES = ["active", "inactive", "restricted", "blocked"];

const ACTIVITY_SEGMENT_FILTER_OPTIONS = [
  { value: "new", label: "Новый, без заказов" },
  { value: "new_with_orders", label: "Новый, с заказами" },
  { value: "active_7d", label: "Активен (≤7 дн. с логина)" },
  { value: "warm_30d", label: "Тёплый (8–30 дн.)" },
  { value: "inactive_30d_plus", label: "Неактивен (30+ дн.)" },
] as const;

function activitySegmentLabel(code?: string | null): string {
  if (!code) return "—";
  const map: Record<string, string> = {
    new: "Новый, без заказов",
    new_with_orders: "Новый, с заказами",
    active_7d: "Активен (7 дн.)",
    warm_30d: "Тёплый (30 дн.)",
    inactive_30d_plus: "Неактивен 30+ дн.",
    unknown: "неизв.",
  };
  return map[code] ?? code;
}

function accountStatusColor(status?: string | null): string {
  if (!status || status === "active") return "green";
  if (status === "blocked") return "red";
  if (status === "restricted") return "gold";
  return "default";
}

/** Человекочитаемое название аккаунта покупателя/общее для таблицы пользователей */
function buyerAccountStatusRu(status?: string | null): string {
  const s = status || "active";
  switch (s) {
    case "active":
      return "активен";
    case "inactive":
      return "неактивен";
    case "restricted":
      return "ограничен";
    case "blocked":
      return "заблокирован";
    default:
      return s;
  }
}

export default function AdminUsersPage() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const { data: me } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: () => getAuthMeCached(),
  });
  const canManageStaffRoles =
    me?.permissions?.includes("admin.users.staff_manage") ?? false;

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
  const {
    data: profileData,
    isLoading: profileLoading,
    isError: profileError,
    error: profileErr,
    refetch: refetchProfile,
  } = useQuery({
    queryKey: ["admin-user-profile", selectedUserId],
    enabled: Boolean(selectedUserId),
    queryFn: async () => {
      const res = await apiClient.get<{
        success: boolean;
        data: UserProfileData;
        message?: string;
      }>(`/admin/users/${selectedUserId}/profile`);
      if (!res.data.success || !res.data.data) {
        throw new Error(
          res.data.message ?? "Не удалось получить карточку пользователя",
        );
      }
      return res.data.data;
    },
  });

  const ordersColumns = useMemo(
    () => [
      { title: "ID", dataIndex: "id", width: 72 },
      { title: "Номер", dataIndex: "order_number", width: 170 },
      {
        title: "Статус",
        dataIndex: "status",
        width: 110,
        render: (v: string) => <Tag>{v || "—"}</Tag>,
      },
      { title: "Сумма", dataIndex: "total_amount", width: 110 },
      { title: "Создан", dataIndex: "created_at", width: 160 },
    ],
    [],
  );

  const actionsColumns = useMemo(
    () => [
      { title: "Дата", dataIndex: "created_at", width: 160 },
      { title: "Админ", dataIndex: "admin_email", width: 200 },
      { title: "Действие", dataIndex: "action_type", width: 160 },
      {
        title: "Детали",
        dataIndex: "details",
        render: (v: unknown) => (
          <Typography.Paragraph
            style={{ marginBottom: 0 }}
            ellipsis={{ rows: 2, expandable: true }}
          >
            {typeof v === "string" ? v : JSON.stringify(v)}
          </Typography.Paragraph>
        ),
      },
    ],
    [],
  );

  const returnsColumns = useMemo(
    () => [
      { title: "ID", dataIndex: "id", width: 72 },
      { title: "Номер", dataIndex: "order_number", width: 150 },
      {
        title: "Статус",
        dataIndex: "status",
        width: 100,
        render: (v: string) => <Tag>{v || "—"}</Tag>,
      },
      { title: "Сумма", dataIndex: "total_amount", width: 100 },
      { title: "Дата", dataIndex: "created_at", width: 160 },
    ],
    [],
  );

  const appealsColumns = useMemo(
    () => [
      { title: "ID", dataIndex: "id", width: 72 },
      {
        title: "Тип",
        dataIndex: "type",
        width: 120,
        render: (v: string) => <Tag color="purple">{v || "—"}</Tag>,
      },
      { title: "Заголовок", dataIndex: "title", width: 200, ellipsis: true },
      { title: "Сообщение", dataIndex: "message", ellipsis: true },
      { title: "Дата", dataIndex: "created_at", width: 160 },
    ],
    [],
  );

  const applyUserPatch = async (patch: Record<string, unknown>) => {
    if (!selectedUserId) return;
    await apiClient.put(`/admin/users/${selectedUserId}`, patch);
    await Promise.all([tableQuery.refetch(), refetchProfile()]);
  };

  return (
    <Space direction="vertical" size={16} style={{ width: "100%" }}>
      {hiddenSearchForm}
      <Card>
        <Space wrap align="start">
          <Typography.Text strong>Поиск и сегмент</Typography.Text>
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
          <Select
            allowClear
            placeholder="Сегмент активности"
            style={{ width: 280 }}
            value={
              (
                getDefaultFilter("activity_segment", filters, "eq") as
                  | string[]
                  | undefined
              )?.[0] as string | undefined
            }
            options={[...ACTIVITY_SEGMENT_FILTER_OPTIONS]}
            onChange={(v) =>
              setFilters(
                [
                  {
                    field: "activity_segment",
                    operator: "eq",
                    value: v ?? undefined,
                  },
                ],
                "merge",
              )
            }
          />
        </Space>
      </Card>
      <Table<UserRow>
        {...(tableProps as TableProps<UserRow>)}
        rowKey="id"
        pagination={{ ...tableProps.pagination, showSizeChanger: true }}
        onRow={(record) => ({
          onClick: () => setSelectedUserId(record.id),
          style: { cursor: "pointer" },
        })}
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
        <Table.Column<UserRow>
          dataIndex="phone"
          title="Телефон"
          width={180}
          render={(v: string | null, r) => (
            <Space direction="vertical" size={6} style={{ paddingTop: 6 }}>
              <Typography.Text strong style={{ fontSize: 15 }}>
                {v || "—"}
              </Typography.Text>
              {r.phone_verified_at ? (
                <Tag color="green">тел. подтв.</Tag>
              ) : (
                <Tag color="red">тел. не подтв.</Tag>
              )}
            </Space>
          )}
        />
        <Table.Column<UserRow>
          dataIndex="email"
          title="Email"
          ellipsis
          render={(v: string | null, r) => (
            <Space direction="vertical" size={6} style={{ paddingTop: 6 }}>
              <Typography.Text strong style={{ fontSize: 15 }}>
                {v || "—"}
              </Typography.Text>
              {r.email_verified_at ? (
                <Tag color="green">email подтв.</Tag>
              ) : (
                <Tag color="red">email не подтв.</Tag>
              )}
            </Space>
          )}
        />
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
              <Tag color={accountStatusColor(record.status)}>
                {buyerAccountStatusRu(record.status)}
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
          title="Сегмент"
          width={200}
          render={(_, r) => (
            <Tag color="geekblue">
              {activitySegmentLabel(r.activity_segment)}
            </Tag>
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
          width={420}
          fixed="right"
          render={(_, record) => (
            <AdminActionSurface>
              <AdminActionSection title="Роли">
                <Space size={6} wrap>
                  <Select
                    size="small"
                    style={{ width: 110 }}
                    value={record.role}
                    options={MARKETPLACE_ROLES.map((r) => ({
                      label: r,
                      value: r,
                    }))}
                    onChange={async (value) => {
                      try {
                        await apiClient.put(`/admin/users/${record.id}`, {
                          role: value,
                        });
                        message.success(`Роль витрины: ${value}`);
                        await tableQuery.refetch();
                      } catch (e) {
                        message.error(
                          e instanceof Error ? e.message : "Ошибка",
                        );
                      }
                    }}
                  />
                  {canManageStaffRoles ? (
                    <Select
                      size="small"
                      style={{ width: 170 }}
                      placeholder="Роль в админке"
                      value={record.staff_role ?? ""}
                      options={[
                        { label: "— нет —", value: "" },
                        ...ADMIN_ROLES.map((r) => ({ label: r, value: r })),
                      ]}
                      onChange={async (value) => {
                        try {
                          await apiClient.put(`/admin/users/${record.id}`, {
                            staff_role: value === "" ? "" : value,
                          });
                          message.success("Админ-роль обновлена");
                          await tableQuery.refetch();
                        } catch (e) {
                          message.error(
                            e instanceof Error ? e.message : "Ошибка",
                          );
                        }
                      }}
                    />
                  ) : null}
                </Space>
              </AdminActionSection>
              <AdminActionSection title="Статус и действия">
                <Space size={6} wrap>
                  <Select
                    size="small"
                    style={{ width: 120 }}
                    value={record.status || "active"}
                    options={STATUSES.map((s) => ({
                      label: buyerAccountStatusRu(s),
                      value: s,
                    }))}
                    onChange={async (value) => {
                      try {
                        await apiClient.put(`/admin/users/${record.id}`, {
                          status: value,
                        });
                        message.success(
                          `Статус: ${buyerAccountStatusRu(String(value))}`,
                        );
                        await tableQuery.refetch();
                      } catch (e) {
                        message.error(
                          e instanceof Error ? e.message : "Ошибка",
                        );
                      }
                    }}
                  />
                  <Button
                    size="small"
                    type="default"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedUserId(record.id);
                    }}
                  >
                    Профиль
                  </Button>
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
                        message.error(
                          e instanceof Error ? e.message : "Ошибка",
                        );
                      }
                    }}
                  >
                    Блок
                  </Button>
                </Space>
              </AdminActionSection>
            </AdminActionSurface>
          )}
        />
      </Table>

      <Drawer
        title={
          selectedUserId
            ? `Карточка пользователя #${selectedUserId}`
            : "Карточка пользователя"
        }
        open={Boolean(selectedUserId)}
        onClose={() => setSelectedUserId(null)}
        width={920}
        destroyOnClose
      >
        {profileError ? (
          <Alert
            type="error"
            message="Не удалось загрузить профиль пользователя"
            description={
              profileErr instanceof Error
                ? profileErr.message
                : "Ошибка запроса"
            }
          />
        ) : (
          <Space direction="vertical" size={16} style={{ width: "100%" }}>
            <Card loading={profileLoading} size="small" title="Профиль">
              <Descriptions column={2} size="small" bordered>
                <Descriptions.Item label="ID">
                  {profileData?.user?.id ?? "—"}
                </Descriptions.Item>
                <Descriptions.Item label="Роль">
                  {profileData?.user?.role ?? "—"}
                </Descriptions.Item>
                <Descriptions.Item label="Имя">
                  {[profileData?.user?.name, profileData?.user?.surname]
                    .filter(Boolean)
                    .join(" ") || "—"}
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                  {profileData?.user?.email ?? "—"}
                </Descriptions.Item>
                <Descriptions.Item label="Email подтвержден">
                  {profileData?.user?.email_verified_at ? (
                    <Tag color="green">
                      да ({String(profileData.user.email_verified_at)})
                    </Tag>
                  ) : (
                    <Tag>нет</Tag>
                  )}
                </Descriptions.Item>
                <Descriptions.Item label="Телефон">
                  {profileData?.user?.phone ?? "—"}
                </Descriptions.Item>
                <Descriptions.Item label="Телефон подтвержден">
                  {profileData?.user?.phone_verified_at ? (
                    <Tag color="green">
                      да ({String(profileData.user.phone_verified_at)})
                    </Tag>
                  ) : (
                    <Tag>нет</Tag>
                  )}
                </Descriptions.Item>
                <Descriptions.Item label="Статус">
                  <Tag color={accountStatusColor(profileData?.user?.status)}>
                    {profileData?.user?.status ?? "active"}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Статус продавца">
                  <Tag>{profileData?.user?.seller_status ?? "—"}</Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Верификация">
                  <Tag>
                    {profileData?.user?.company_verification_status ?? "—"}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Сегмент активности">
                  <Tag color="blue">
                    {profileData?.stats?.activity_segment ?? "—"}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Логинов">
                  {profileData?.user?.login_count ?? 0}
                </Descriptions.Item>
              </Descriptions>
            </Card>

            <Card
              loading={profileLoading}
              size="small"
              title="Верификация контактов"
            >
              <Space wrap>
                {!profileData?.user?.email_verified_at ? (
                  <Button
                    type="primary"
                    onClick={async () => {
                      try {
                        await applyUserPatch({ email_verified: true });
                        message.success("Email помечен как подтвержденный");
                      } catch (e) {
                        message.error(
                          e instanceof Error ? e.message : "Ошибка",
                        );
                      }
                    }}
                  >
                    Подтвердить email
                  </Button>
                ) : (
                  <Button
                    danger
                    onClick={async () => {
                      try {
                        await applyUserPatch({ email_verified: false });
                        message.success("Подтверждение email снято");
                      } catch (e) {
                        message.error(
                          e instanceof Error ? e.message : "Ошибка",
                        );
                      }
                    }}
                  >
                    Отозвать подтверждение email
                  </Button>
                )}
                {!profileData?.user?.phone_verified_at ? (
                  <Button
                    type="primary"
                    onClick={async () => {
                      try {
                        await applyUserPatch({ phone_verified: true });
                        message.success("Телефон помечен как подтвержденный");
                      } catch (e) {
                        message.error(
                          e instanceof Error ? e.message : "Ошибка",
                        );
                      }
                    }}
                  >
                    Подтвердить телефон
                  </Button>
                ) : (
                  <Button
                    danger
                    onClick={async () => {
                      try {
                        await applyUserPatch({ phone_verified: false });
                        message.success("Подтверждение телефона снято");
                      } catch (e) {
                        message.error(
                          e instanceof Error ? e.message : "Ошибка",
                        );
                      }
                    }}
                  >
                    Отозвать подтверждение телефона
                  </Button>
                )}
              </Space>
            </Card>

            <Card
              loading={profileLoading}
              size="small"
              title="Быстрые действия"
            >
              <Space wrap size={12}>
                <Space direction="vertical" size={4}>
                  <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                    Статус аккаунта
                  </Typography.Text>
                  <Select
                    size="small"
                    style={{ width: 160 }}
                    value={profileData?.user?.status || "active"}
                    options={STATUSES.map((s) => ({
                      label: buyerAccountStatusRu(s),
                      value: s,
                    }))}
                    onChange={async (value) => {
                      try {
                        await applyUserPatch({ status: value });
                        message.success(
                          `Статус: ${buyerAccountStatusRu(String(value))}`,
                        );
                      } catch (e) {
                        message.error(
                          e instanceof Error ? e.message : "Ошибка",
                        );
                      }
                    }}
                  />
                </Space>
                <Space direction="vertical" size={4}>
                  <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                    Статус продавца
                  </Typography.Text>
                  <Select
                    size="small"
                    style={{ width: 190 }}
                    value={profileData?.user?.seller_status || "draft"}
                    options={[
                      "draft",
                      "seller_pending",
                      "pending",
                      "approved",
                      "rejected",
                      "failed",
                    ].map((s) => ({ label: s, value: s }))}
                    onChange={async (value) => {
                      try {
                        await applyUserPatch({ seller_status: value });
                        message.success(`seller_status: ${value}`);
                      } catch (e) {
                        message.error(
                          e instanceof Error ? e.message : "Ошибка",
                        );
                      }
                    }}
                  />
                </Space>
                <Space direction="vertical" size={4}>
                  <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                    Верификация компании
                  </Typography.Text>
                  <Select
                    size="small"
                    style={{ width: 220 }}
                    value={
                      profileData?.user?.company_verification_status || "draft"
                    }
                    options={["draft", "pending", "verified", "failed"].map(
                      (s) => ({
                        label: s,
                        value: s,
                      }),
                    )}
                    onChange={async (value) => {
                      try {
                        await applyUserPatch({
                          company_verification_status: value,
                        });
                        message.success(
                          `company_verification_status: ${value}`,
                        );
                      } catch (e) {
                        message.error(
                          e instanceof Error ? e.message : "Ошибка",
                        );
                      }
                    }}
                  />
                </Space>
              </Space>
            </Card>

            <Card loading={profileLoading} size="small" title="История заказов">
              <Table
                rowKey={(r) => String(r.id)}
                columns={ordersColumns}
                dataSource={profileData?.orders ?? []}
                pagination={{ pageSize: 5 }}
                size="small"
              />
            </Card>

            <Card
              loading={profileLoading}
              size="small"
              title="Действия администраторов"
            >
              <Table
                rowKey={(r) => String(r.id)}
                columns={actionsColumns}
                dataSource={profileData?.admin_actions ?? []}
                pagination={{ pageSize: 5 }}
                size="small"
              />
            </Card>

            <Card
              loading={profileLoading}
              size="small"
              title="Возвраты (заказы с возвратом оплаты)"
            >
              <Table
                rowKey={(r) => String(r.id)}
                columns={returnsColumns}
                dataSource={profileData?.returns ?? []}
                pagination={{ pageSize: 5 }}
                size="small"
                locale={{ emptyText: "Нет заказов со статусом возврата" }}
              />
            </Card>

            <Card
              loading={profileLoading}
              size="small"
              title="Обращения (уведомления)"
            >
              <Typography.Paragraph
                type="secondary"
                style={{ marginBottom: 12 }}
              >
                Данные из таблицы уведомлений (appeal / support / return).
                Отдельный тикетинг — позже.
              </Typography.Paragraph>
              <Table
                rowKey={(r) => String(r.id)}
                columns={appealsColumns}
                dataSource={profileData?.appeals ?? []}
                pagination={{ pageSize: 5 }}
                size="small"
                locale={{ emptyText: "Нет обращений" }}
              />
            </Card>
          </Space>
        )}
      </Drawer>
    </Space>
  );
}
