"use client";

import type { TableProps } from "antd";
import { Card, Input, Select, Space, Table, Tag, Typography } from "antd";
import { getDefaultFilter } from "@refinedev/antd";
import { useAdminTable } from "~/src/refine/admin/useAdminTable";
import { useRefineSearchFilterValue } from "~/src/refine/admin/useRefineSearchFilterValue";

type ActionRow = {
  id: number;
  admin_id: number;
  admin_email?: string;
  action_type: string;
  target_type: string;
  target_id: number;
  details?: string | null;
  created_at: string;
};

const TARGET_TYPES = ["user", "order", "product"];

export default function AdminActionsPage() {
  const { tableProps, setFilters, filters, hiddenSearchForm } = useAdminTable({
    resource: "actions",
    syncWithLocation: true,
  });

  const search = useRefineSearchFilterValue(filters);

  return (
    <Space direction="vertical" size={16} style={{ width: "100%" }}>
      {hiddenSearchForm}
      <Card>
        <Space wrap>
          <Typography.Text strong>Поиск</Typography.Text>
          <Input.Search
            allowClear
            value={search}
            placeholder="ID админа / email / action_type / target_type"
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
            style={{ width: 340 }}
          />
          <Select
            allowClear
            style={{ width: 180 }}
            placeholder="Целевая сущность"
            value={
              (
                getDefaultFilter("target_type", filters, "eq") as
                  | string[]
                  | undefined
              )?.[0]
            }
            options={TARGET_TYPES.map((v) => ({ label: v, value: v }))}
            onChange={(value) =>
              setFilters(
                [{ field: "target_type", operator: "eq", value }],
                "merge",
              )
            }
          />
        </Space>
      </Card>
      <Table<ActionRow>
        {...(tableProps as TableProps<ActionRow>)}
        rowKey="id"
        pagination={{ ...tableProps.pagination, showSizeChanger: true }}
      >
        <Table.Column<ActionRow> dataIndex="id" title="ID" width={72} />
        <Table.Column<ActionRow>
          dataIndex="created_at"
          title="Дата"
          width={170}
        />
        <Table.Column<ActionRow>
          dataIndex="admin_email"
          title="Администратор"
          render={(v, row) => v || `#${row.admin_id}`}
        />
        <Table.Column<ActionRow>
          dataIndex="action_type"
          title="Действие"
          width={190}
          render={(v: string) => <Tag color="blue">{v}</Tag>}
        />
        <Table.Column<ActionRow>
          title="Цель"
          width={180}
          render={(_, row) => (
            <Tag color="purple">
              {row.target_type} #{row.target_id}
            </Tag>
          )}
        />
        <Table.Column<ActionRow>
          dataIndex="details"
          title="Детали"
          render={(v?: string | null) => (
            <Typography.Paragraph
              style={{ marginBottom: 0 }}
              ellipsis={{ rows: 2, expandable: true }}
            >
              {v || "—"}
            </Typography.Paragraph>
          )}
        />
      </Table>
    </Space>
  );
}
