"use client";

import type { TableProps } from "antd";
import {
  Card,
  Input,
  InputNumber,
  Select,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import { getDefaultSortOrder } from "@refinedev/antd";
import { useAdminTable } from "~/src/refine/admin/useAdminTable";
import { useRefineSearchFilterValue } from "~/src/refine/admin/useRefineSearchFilterValue";
import { formatRub } from "~/src/shared/lib/format-currency";

type ProductRow = {
  id: number;
  name: string;
  user_id: number;
  category_id: number;
  category_name?: string | null;
  seller_name?: string | null;
  status: string;
  price: number;
  stock_quantity?: number;
  created_at: string;
};

const STATUS_OPTIONS = [
  { label: "pending", value: "pending" },
  { label: "approved", value: "approved" },
  { label: "rejected", value: "rejected" },
  { label: "draft", value: "draft" },
  { label: "archived", value: "archived" },
];

export default function AdminProductsPage() {
  const { tableProps, setFilters, filters, sorters, hiddenSearchForm } =
    useAdminTable({
      resource: "products",
      syncWithLocation: true,
    });

  const search = useRefineSearchFilterValue(filters);

  const statusVal = filters.find((f) => "field" in f && f.field === "status")
    ?.value as string | undefined;
  const sellerVal = filters.find((f) => "field" in f && f.field === "seller_id")
    ?.value as number | undefined;
  const catVal = filters.find((f) => "field" in f && f.field === "category_id")
    ?.value as number | undefined;

  const setFilterField = (
    field: string,
    value: string | number | undefined | null,
  ) => {
    const rest = filters.filter((f) => !("field" in f && f.field === field));
    if (value === undefined || value === null || value === "") {
      setFilters(rest, "replace");
      return;
    }
    setFilters([...rest, { field, operator: "eq", value }], "replace");
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
            placeholder="Название / описание"
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
          <Typography.Text strong>Статус</Typography.Text>
          <Select
            allowClear
            placeholder="Все"
            style={{ width: 140 }}
            value={statusVal}
            options={STATUS_OPTIONS}
            onChange={(v) => setFilterField("status", v)}
          />
          <Typography.Text strong>Продавец</Typography.Text>
          <InputNumber
            min={1}
            placeholder="ID (users.id)"
            value={sellerVal}
            onChange={(v) => setFilterField("seller_id", v ?? undefined)}
            style={{ width: 140 }}
          />
          <Typography.Text strong>Категория</Typography.Text>
          <InputNumber
            min={1}
            placeholder="ID категории"
            value={catVal}
            onChange={(v) => setFilterField("category_id", v ?? undefined)}
            style={{ width: 140 }}
          />
        </Space>
      </Card>
      <Table<ProductRow>
        {...(tableProps as TableProps<ProductRow>)}
        rowKey="id"
        pagination={{ ...tableProps.pagination, showSizeChanger: true }}
      >
        <Table.Column<ProductRow>
          key="id"
          dataIndex="id"
          title="ID"
          sorter
          defaultSortOrder={getDefaultSortOrder("id", sorters)}
        />
        <Table.Column<ProductRow>
          key="name"
          dataIndex="name"
          title="Товар"
          sorter
          ellipsis
        />
        <Table.Column<ProductRow>
          title="Продавец"
          render={(_, row) => (
            <span>
              {row.seller_name ?? "—"}{" "}
              <Typography.Text type="secondary">#{row.user_id}</Typography.Text>
            </span>
          )}
        />
        <Table.Column<ProductRow>
          title="Категория"
          render={(_, row) => (
            <span>
              {row.category_name ?? "—"}{" "}
              <Typography.Text type="secondary">
                #{row.category_id}
              </Typography.Text>
            </span>
          )}
        />
        <Table.Column<ProductRow>
          key="status"
          dataIndex="status"
          title="Статус"
          sorter
          render={(v: string) => (
            <Tag color={v === "approved" ? "green" : "orange"}>{v}</Tag>
          )}
        />
        <Table.Column<ProductRow>
          key="price"
          dataIndex="price"
          title="Цена"
          sorter
          render={(v: number) => formatRub(v)}
        />
        <Table.Column<ProductRow>
          key="stock_quantity"
          dataIndex="stock_quantity"
          title="Остаток"
          sorter
        />
        <Table.Column<ProductRow>
          key="created_at"
          dataIndex="created_at"
          title="Создан"
          sorter
        />
      </Table>
    </Space>
  );
}
