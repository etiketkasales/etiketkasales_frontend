"use client";

import type { TableProps } from "antd";
import { Card, Input, Space, Table, Tag, Typography } from "antd";
import { getDefaultFilter, getDefaultSortOrder } from "@refinedev/antd";
import { useAdminTable } from "~/src/refine/admin/useAdminTable";
import { useRefineSearchFilterValue } from "~/src/refine/admin/useRefineSearchFilterValue";
import { formatRub } from "~/src/shared/lib/format-currency";

type OrderRow = {
  id: number;
  order_number: string;
  user_id: number;
  status: string;
  total_amount: number;
  created_at: string;
};

const STATUS_FILTERS = [
  "pending_payment",
  "paid",
  "accepted",
  "shipped",
  "in_transit",
  "delivered",
  "cancelled",
  "refunded",
].map((s) => ({ text: s, value: s }));

export default function AdminOrdersPage() {
  const { tableProps, setFilters, filters, sorters, hiddenSearchForm } =
    useAdminTable({
      resource: "orders",
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
        </Space>
      </Card>

      <Table<OrderRow>
        {...(tableProps as TableProps<OrderRow>)}
        rowKey="id"
        pagination={{ ...tableProps.pagination, showSizeChanger: true }}
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
        />
        <Table.Column<OrderRow>
          key="status"
          dataIndex="status"
          title="Статус"
          render={(value: string) => <Tag>{value}</Tag>}
          filters={STATUS_FILTERS}
          filteredValue={getDefaultFilter("status", filters, "eq")}
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
    </Space>
  );
}
