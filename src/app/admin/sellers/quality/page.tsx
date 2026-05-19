"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Button,
  Card,
  Descriptions,
  Drawer,
  Input,
  Select,
  Space,
  Statistic,
  Table,
  Tag,
  Typography,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { apiClient } from "~/src/shared/lib/api/client.api";
import { AdminActionSurface } from "~/src/features/admin/ui/admin-action-surface";

type SellerQualityRow = {
  seller_id: number;
  seller_name: string;
  seller_email?: string | null;
  seller_phone?: string | null;
  company_name?: string | null;
  orders_in_period: number;
  overdue_orders: number;
  failed_orders: number;
  violations_count: number;
  sla_score: number;
  seller_rating: number;
};

type ViolationRow = {
  id: number;
  admin_id: number;
  admin_name: string;
  action_type: string;
  target_type: string;
  target_id: number;
  product_name: string;
  details?: { reason?: string } | null;
  created_at?: string | null;
};

function slaColor(score: number): string {
  if (score >= 95) return "green";
  if (score >= 85) return "gold";
  return "red";
}

function escapeCsvCell(value: unknown): string {
  const text = String(value ?? "");
  if (/[",\n;]/.test(text)) {
    return `"${text.replaceAll('"', '""')}"`;
  }
  return text;
}

export default function AdminSellersQualityPage() {
  const [days, setDays] = useState<number>(30);
  const [search, setSearch] = useState<string>("");
  const [selectedSeller, setSelectedSeller] = useState<SellerQualityRow | null>(
    null,
  );
  const [actionType, setActionType] = useState<string | undefined>(undefined);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-sellers-quality", days, search],
    queryFn: async () => {
      const res = await apiClient.get<{
        success: boolean;
        data: { items: SellerQualityRow[] };
      }>("/admin/sellers/quality", {
        params: { days, search: search || undefined, page: 1, limit: 100 },
      });
      return res.data.data.items ?? [];
    },
  });

  const totals = useMemo(() => {
    const rows = data ?? [];
    const sellers = rows.length;
    const avgSla =
      sellers > 0
        ? rows.reduce((acc, r) => acc + (r.sla_score ?? 0), 0) / sellers
        : 0;
    const overdue = rows.reduce((acc, r) => acc + (r.overdue_orders ?? 0), 0);
    const violations = rows.reduce(
      (acc, r) => acc + (r.violations_count ?? 0),
      0,
    );
    const avgRating =
      sellers > 0
        ? rows.reduce((acc, r) => acc + (r.seller_rating ?? 0), 0) / sellers
        : 0;
    return { sellers, avgSla, overdue, violations, avgRating };
  }, [data]);

  const { data: violations, isLoading: violationsLoading } = useQuery({
    queryKey: [
      "admin-seller-violations",
      selectedSeller?.seller_id,
      days,
      actionType,
    ],
    enabled: Boolean(selectedSeller?.seller_id),
    queryFn: async () => {
      if (!selectedSeller?.seller_id) return [];
      const res = await apiClient.get<{
        success: boolean;
        data: { items: ViolationRow[] };
      }>(`/admin/sellers/${selectedSeller.seller_id}/violations`, {
        params: { days, limit: 100, action_type: actionType || undefined },
      });
      return res.data.data.items ?? [];
    },
  });

  const downloadViolationsCsv = () => {
    if (!selectedSeller) return;
    const rows = violations ?? [];
    const header = [
      "id",
      "created_at",
      "action_type",
      "admin_id",
      "admin_name",
      "target_id",
      "product_name",
      "reason",
    ];
    const lines = [header.join(";")];
    for (const row of rows) {
      lines.push(
        [
          row.id,
          row.created_at ?? "",
          row.action_type,
          row.admin_id,
          row.admin_name,
          row.target_id,
          row.product_name,
          row.details?.reason ?? "",
        ]
          .map(escapeCsvCell)
          .join(";"),
      );
    }
    const csv = "\uFEFF" + lines.join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const safeName = (selectedSeller.seller_name || "seller").replaceAll(
      /\s+/g,
      "_",
    );
    a.href = url;
    a.download = `seller_violations_${selectedSeller.seller_id}_${safeName}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const columns: ColumnsType<SellerQualityRow> = useMemo(
    () => [
      { title: "Seller ID", dataIndex: "seller_id", width: 90 },
      { title: "Продавец", dataIndex: "seller_name", width: 220 },
      { title: "Компания", dataIndex: "company_name", width: 220 },
      { title: "Email", dataIndex: "seller_email", width: 220 },
      { title: "Телефон", dataIndex: "seller_phone", width: 150 },
      { title: "Заказы", dataIndex: "orders_in_period", width: 100 },
      {
        title: "Просрочки",
        dataIndex: "overdue_orders",
        width: 120,
        render: (v: number) => <Tag color={v > 0 ? "red" : "green"}>{v}</Tag>,
      },
      {
        title: "Срывы/возвраты",
        dataIndex: "failed_orders",
        width: 140,
        render: (v: number) => <Tag color={v > 0 ? "gold" : "green"}>{v}</Tag>,
      },
      {
        title: "Нарушения",
        dataIndex: "violations_count",
        width: 120,
        render: (v: number) => <Tag color={v > 0 ? "red" : "green"}>{v}</Tag>,
      },
      {
        title: "SLA score",
        dataIndex: "sla_score",
        width: 110,
        render: (v: number) => <Tag color={slaColor(v)}>{v.toFixed(2)}%</Tag>,
      },
      {
        title: "Рейтинг",
        dataIndex: "seller_rating",
        width: 100,
        render: (v: number) => (
          <Tag color={v >= 4.5 ? "green" : v >= 3.5 ? "gold" : "red"}>
            {v.toFixed(2)}
          </Tag>
        ),
      },
      {
        title: "История",
        key: "actions",
        width: 120,
        fixed: "right",
        render: (_, row) => (
          <AdminActionSurface>
            <Button
              size="small"
              onClick={() => {
                setSelectedSeller(row);
              }}
            >
              Открыть
            </Button>
          </AdminActionSurface>
        ),
      },
    ],
    [],
  );

  return (
    <Space direction="vertical" size={16} style={{ width: "100%" }}>
      <Card>
        <Space wrap>
          <Select
            value={days}
            onChange={setDays}
            options={[
              { label: "7 дней", value: 7 },
              { label: "30 дней", value: 30 },
              { label: "90 дней", value: 90 },
              { label: "180 дней", value: 180 },
            ]}
            style={{ width: 140 }}
          />
          <Input.Search
            allowClear
            placeholder="Поиск продавца / email / телефон / компания"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: 360 }}
          />
        </Space>
      </Card>

      <Space wrap size={16}>
        <Card>
          <Statistic title="Продавцов" value={totals.sellers} />
        </Card>
        <Card>
          <Statistic
            title="Средний SLA"
            value={totals.avgSla}
            suffix="%"
            precision={2}
          />
        </Card>
        <Card>
          <Statistic
            title="Средний рейтинг"
            value={totals.avgRating}
            precision={2}
          />
        </Card>
        <Card>
          <Statistic title="Просроченные заказы" value={totals.overdue} />
        </Card>
        <Card>
          <Statistic title="Нарушения (период)" value={totals.violations} />
        </Card>
      </Space>

      <Card
        title="SLA и нарушения продавцов"
        extra={
          <Typography.Text type="secondary">
            MVP: расчёт на текущих orders/order_items/admin_actions
          </Typography.Text>
        }
      >
        <Table<SellerQualityRow>
          rowKey={(r) => String(r.seller_id)}
          columns={columns}
          dataSource={data ?? []}
          loading={isLoading}
          onRow={(record) => ({
            onClick: () => setSelectedSeller(record),
          })}
          pagination={{ pageSize: 20 }}
          scroll={{ x: 1600 }}
          size="small"
        />
      </Card>

      <Drawer
        title={
          selectedSeller
            ? `Нарушения продавца: ${selectedSeller.seller_name}`
            : "Нарушения продавца"
        }
        open={Boolean(selectedSeller)}
        onClose={() => {
          setSelectedSeller(null);
          setActionType(undefined);
        }}
        width={820}
      >
        {selectedSeller ? (
          <Space direction="vertical" size={16} style={{ width: "100%" }}>
            <Descriptions size="small" bordered column={2}>
              <Descriptions.Item label="Seller ID">
                {selectedSeller.seller_id}
              </Descriptions.Item>
              <Descriptions.Item label="SLA">
                {selectedSeller.sla_score.toFixed(2)}%
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {selectedSeller.seller_email || "—"}
              </Descriptions.Item>
              <Descriptions.Item label="Телефон">
                {selectedSeller.seller_phone || "—"}
              </Descriptions.Item>
            </Descriptions>

            <Select
              allowClear
              placeholder="Фильтр по типу"
              value={actionType}
              onChange={(v) => setActionType(v)}
              options={[
                { label: "Отклонение товара", value: "reject_product" },
                { label: "Обновление товара", value: "update_product" },
              ]}
              style={{ width: 240 }}
            />

            <Space>
              <Button
                onClick={downloadViolationsCsv}
                disabled={!violations || violations.length === 0}
              >
                Экспорт CSV
              </Button>
            </Space>

            <Table<ViolationRow>
              rowKey={(r) => String(r.id)}
              loading={violationsLoading}
              dataSource={violations ?? []}
              pagination={{ pageSize: 10 }}
              columns={[
                { title: "Когда", dataIndex: "created_at", width: 180 },
                { title: "Тип", dataIndex: "action_type", width: 160 },
                { title: "Админ", dataIndex: "admin_name", width: 180 },
                { title: "Товар", dataIndex: "product_name", width: 220 },
                {
                  title: "Причина",
                  key: "reason",
                  render: (_, row) => row.details?.reason || "—",
                },
                {
                  title: "Действие",
                  key: "go-product",
                  width: 120,
                  render: (_, row) => (
                    <Button
                      size="small"
                      onClick={() => {
                        window.open(
                          `/admin/products?search=${encodeURIComponent(String(row.target_id))}`,
                          "_blank",
                        );
                      }}
                    >
                      К товару
                    </Button>
                  ),
                },
              ]}
              scroll={{ x: 900 }}
              size="small"
            />
          </Space>
        ) : null}
      </Drawer>
    </Space>
  );
}
