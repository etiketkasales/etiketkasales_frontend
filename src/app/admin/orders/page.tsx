"use client";

import { useState } from "react";
import type { TableProps } from "antd";
import {
  Alert,
  App,
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
} from "antd";
import { getDefaultFilter, getDefaultSortOrder } from "@refinedev/antd";
import { useInvalidate } from "@refinedev/core";
import { useAdminTable } from "~/src/refine/admin/useAdminTable";
import { useAdminPermission } from "~/src/refine/admin/useAdminPermission";
import { useRefineSearchFilterValue } from "~/src/refine/admin/useRefineSearchFilterValue";
import { apiClient } from "~/src/shared/lib/api/client.api";
import { formatRub } from "~/src/shared/lib/format-currency";
import { parseAxiosApiValidation } from "~/src/shared/lib/functions/shared.func";

type OrderRow = {
  id: number;
  order_number: string;
  user_id: number;
  user_name?: string;
  user_email?: string;
  user_phone?: string;
  status: string;
  payment_status?: string;
  total_amount: number;
  delivery_method?: string | null;
  delivery_address?: string | null;
  tracking_number?: string | null;
  notes?: string | null;
  created_at: string;
};

const STATUS_OPTIONS = [
  { value: "pending_payment", label: "Ожидает оплаты" },
  { value: "paid", label: "Оплачен" },
  { value: "accepted", label: "Принят" },
  { value: "shipped", label: "Отправлен" },
  { value: "in_transit", label: "В пути" },
  { value: "delivered", label: "Доставлен" },
  { value: "cancelled", label: "Отменён" },
  { value: "refunded", label: "Возврат" },
] as const;

const STATUS_FILTERS = STATUS_OPTIONS.map((o) => ({
  text: o.label,
  value: o.value,
}));

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <Typography.Text
      type="secondary"
      style={{ display: "block", marginBottom: 6 }}
    >
      {children}
    </Typography.Text>
  );
}

export default function AdminOrdersPage() {
  const { message: msgApi } = App.useApp();
  const invalidate = useInvalidate();
  const { tableProps, setFilters, filters, sorters, hiddenSearchForm } =
    useAdminTable({
      resource: "orders",
      syncWithLocation: true,
    });

  const search = useRefineSearchFilterValue(filters);

  const canEdit = useAdminPermission("admin.orders.edit");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [active, setActive] = useState<OrderRow | null>(null);
  const [editStatus, setEditStatus] = useState("");
  const [editTracking, setEditTracking] = useState("");
  const [editDeliveryMethod, setEditDeliveryMethod] = useState("");
  const [editDeliveryAddress, setEditDeliveryAddress] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const openDrawer = (row: OrderRow) => {
    setActive(row);
    setEditStatus(row.status || "pending_payment");
    setEditTracking(row.tracking_number ?? "");
    setEditDeliveryMethod(row.delivery_method ?? "");
    setEditDeliveryAddress(row.delivery_address ?? "");
    setEditNotes(row.notes ?? "");
    setDrawerOpen(true);
  };

  const saveOrder = async () => {
    if (!canEdit || !active) return;
    setSaving(true);
    try {
      await apiClient.put(`/admin/orders/${active.id}`, {
        status: editStatus,
        tracking_number: editTracking.trim() || null,
        delivery_method: editDeliveryMethod.trim() || null,
        delivery_address: editDeliveryAddress.trim() || null,
        notes: editNotes.trim() || null,
      });
      msgApi.success("Заказ сохранён");
      setDrawerOpen(false);
      await invalidate({ resource: "orders", invalidates: ["list"] });
    } catch (e) {
      const p = parseAxiosApiValidation(e);
      msgApi.error(p.message || "Ошибка сохранения");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Space direction="vertical" size={16} style={{ width: "100%" }}>
      {hiddenSearchForm}
      <Card>
        <Space wrap>
          <Typography.Text strong>Поиск</Typography.Text>
          <Input.Search
            allowClear
            value={search}
            placeholder="Номер заказа / пользователь"
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
            style={{ width: 300 }}
          />
          <Typography.Text type="secondary">
            Клик по строке — редактирование заказа
          </Typography.Text>
        </Space>
      </Card>

      <Table<OrderRow>
        {...(tableProps as TableProps<OrderRow>)}
        rowKey="id"
        pagination={{ ...tableProps.pagination, showSizeChanger: true }}
        onRow={(record) => ({
          onClick: () => openDrawer(record),
          style: { cursor: "pointer" },
        })}
      >
        <Table.Column<OrderRow>
          key="id"
          dataIndex="id"
          title="ID"
          sorter
          defaultSortOrder={getDefaultSortOrder("id", sorters)}
        />
        <Table.Column<OrderRow>
          key="order_number"
          dataIndex="order_number"
          title="Номер"
          sorter
          defaultSortOrder={getDefaultSortOrder("order_number", sorters)}
        />
        <Table.Column<OrderRow>
          key="user_id"
          dataIndex="user_id"
          title="Покупатель"
          sorter
          render={(_: number, row) =>
            row.user_name || row.user_email
              ? `${row.user_name ?? ""} ${row.user_email ? `(${row.user_email})` : ""}`.trim()
              : row.user_id
          }
        />
        <Table.Column<OrderRow>
          key="status"
          dataIndex="status"
          title="Статус"
          render={(value: string) => {
            const label =
              STATUS_OPTIONS.find((o) => o.value === value)?.label ?? value;
            return <Tag>{label}</Tag>;
          }}
          filters={STATUS_FILTERS}
          filteredValue={getDefaultFilter("status", filters, "eq")}
        />
        <Table.Column<OrderRow>
          key="payment_status"
          dataIndex="payment_status"
          title="Оплата"
          render={(v?: string) =>
            v ? <Tag color={v === "paid" ? "green" : "default"}>{v}</Tag> : "—"
          }
        />
        <Table.Column<OrderRow>
          key="total_amount"
          dataIndex="total_amount"
          title="Сумма"
          sorter
          render={(v: number) => formatRub(v)}
        />
        <Table.Column<OrderRow>
          key="created_at"
          dataIndex="created_at"
          title="Создан"
          sorter
        />
      </Table>

      <Drawer
        title={`Заказ #${active?.order_number ?? active?.id ?? "—"}`}
        width={520}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        extra={
          canEdit ? (
            <Button
              type="primary"
              loading={saving}
              onClick={() => void saveOrder()}
            >
              Сохранить
            </Button>
          ) : null
        }
      >
        {!canEdit ? (
          <Alert
            type="info"
            showIcon
            message="Нет права admin.orders.edit — только просмотр"
            style={{ marginBottom: 12 }}
          />
        ) : null}

        {active ? (
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <Descriptions size="small" column={1} bordered>
              <Descriptions.Item label="ID">{active.id}</Descriptions.Item>
              <Descriptions.Item label="Покупатель">
                {active.user_name ?? "—"}
                {active.user_email ? ` · ${active.user_email}` : ""}
                {active.user_phone ? ` · ${active.user_phone}` : ""}
              </Descriptions.Item>
              <Descriptions.Item label="Сумма">
                {formatRub(active.total_amount)}
              </Descriptions.Item>
              <Descriptions.Item label="Оплата">
                {active.payment_status ?? "—"}
              </Descriptions.Item>
              <Descriptions.Item label="Создан">
                {active.created_at}
              </Descriptions.Item>
            </Descriptions>

            <OrderField label="Статус заказа">
              <Select
                style={{ width: "100%" }}
                value={editStatus}
                options={[...STATUS_OPTIONS]}
                onChange={setEditStatus}
                disabled={!canEdit}
              />
            </OrderField>

            <OrderField label="Трек-номер">
              <Input
                value={editTracking}
                onChange={(e) => setEditTracking(e.target.value)}
                disabled={!canEdit}
                placeholder="СДЭК, Почта России…"
              />
            </OrderField>

            <OrderField label="Способ доставки">
              <Input
                value={editDeliveryMethod}
                onChange={(e) => setEditDeliveryMethod(e.target.value)}
                disabled={!canEdit}
              />
            </OrderField>

            <OrderField label="Адрес доставки">
              <Input.TextArea
                rows={3}
                value={editDeliveryAddress}
                onChange={(e) => setEditDeliveryAddress(e.target.value)}
                disabled={!canEdit}
              />
            </OrderField>

            <OrderField label="Комментарий к заказу">
              <Input.TextArea
                rows={4}
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                disabled={!canEdit}
                placeholder="Внутренние заметки, договорённости с клиентом"
              />
            </OrderField>
          </Space>
        ) : null}
      </Drawer>
    </Space>
  );
}

function OrderField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      {children}
    </div>
  );
}
