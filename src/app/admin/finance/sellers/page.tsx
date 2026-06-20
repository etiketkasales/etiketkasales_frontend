"use client";

import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  App,
  Alert,
  Button,
  Card,
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
import { useAuthMe } from "~/src/refine/auth/useAuthMe.hook";
import { parseAxiosApiValidation } from "~/src/shared/lib/functions/shared.func";

type SellerFinanceRow = {
  seller_id: number;
  seller_name: string;
  seller_email?: string | null;
  seller_phone?: string | null;
  company_name?: string | null;
  orders_count: number;
  gmv: number;
  commission: number;
  payout_amount: number;
  admin_payout_status?: string | null;
  admin_payout_note?: string | null;
  admin_payout_marked_at?: string | null;
  admin_payout_marked_by?: number | null;
};

const PAYOUT_STATUS_OPTIONS = [
  { value: "pending", label: "К выплате" },
  { value: "ready", label: "Готово к реестру" },
  { value: "sent", label: "Отправлено" },
  { value: "hold", label: "Пауза" },
] as const;

function payoutStatusLabel(s?: string | null): string {
  if (!s) return "—";
  const m: Record<string, string> = {
    pending: "К выплате",
    ready: "Готово к реестру",
    sent: "Отправлено",
    hold: "Пауза",
  };
  return m[s] ?? s;
}

function payoutStatusColor(s?: string | null): string {
  if (!s) return "default";
  if (s === "sent") return "green";
  if (s === "ready") return "blue";
  if (s === "hold") return "gold";
  if (s === "pending") return "orange";
  return "default";
}

export default function AdminFinanceSellersPage() {
  const { message: msgApi } = App.useApp();
  const queryClient = useQueryClient();
  const [days, setDays] = useState<number>(30);
  const [search, setSearch] = useState<string>("");
  const [payoutRow, setPayoutRow] = useState<SellerFinanceRow | null>(null);
  const [payoutStatus, setPayoutStatus] = useState<string>("");
  const [payoutNote, setPayoutNote] = useState<string>("");

  const { data: me } = useAuthMe();
  const canEditPayout =
    me?.permissions?.includes("admin.finance.edit") ?? false;

  const { data, isLoading } = useQuery({
    queryKey: ["admin-finance-sellers", days, search],
    queryFn: async () => {
      const res = await apiClient.get<{
        success: boolean;
        data: {
          items: SellerFinanceRow[];
          meta: {
            commission_rate: number;
            days?: number;
            calculation_note?: string;
          };
        };
      }>("/admin/finance/sellers", {
        params: { days, search: search || undefined, page: 1, limit: 100 },
      });
      return res.data.data;
    },
  });

  const openPayout = (row: SellerFinanceRow) => {
    setPayoutRow(row);
    setPayoutStatus(
      row.admin_payout_status && row.admin_payout_status !== ""
        ? row.admin_payout_status
        : "",
    );
    setPayoutNote(row.admin_payout_note ?? "");
  };

  const savePayout = async () => {
    if (!payoutRow) return;
    try {
      await apiClient.put(
        `/admin/finance/sellers/${payoutRow.seller_id}/payout-mark`,
        {
          status: payoutStatus,
          note: payoutNote.trim() === "" ? null : payoutNote.trim(),
        },
      );
      msgApi.success("Отметка по выплате сохранена");
      setPayoutRow(null);
      await queryClient.invalidateQueries({
        queryKey: ["admin-finance-sellers"],
      });
    } catch (e) {
      const p = parseAxiosApiValidation(e);
      msgApi.error(p.message || "Ошибка");
    }
  };

  const downloadCsv = async () => {
    if (!canEditPayout) return;
    try {
      const res = await apiClient.get<Blob>("/admin/finance/sellers/export", {
        params: { days, search: search || undefined },
        responseType: "blob",
      });
      const blob = new Blob([res.data], {
        type: "text/csv;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `finance-sellers-d${days}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      msgApi.success("Файл сформирован");
    } catch (e) {
      const p = parseAxiosApiValidation(e);
      msgApi.error(p.message || "Ошибка экспорта");
    }
  };

  const columns: ColumnsType<SellerFinanceRow> = useMemo(() => {
    const base: ColumnsType<SellerFinanceRow> = [
      { title: "Seller ID", dataIndex: "seller_id", width: 90 },
      { title: "Продавец", dataIndex: "seller_name", width: 200 },
      { title: "Компания", dataIndex: "company_name", width: 180 },
      { title: "Email", dataIndex: "seller_email", width: 200 },
      { title: "Телефон", dataIndex: "seller_phone", width: 140 },
      {
        title: "Выплата",
        width: 160,
        render: (_, r) => (
          <Tag color={payoutStatusColor(r.admin_payout_status)}>
            {payoutStatusLabel(r.admin_payout_status)}
          </Tag>
        ),
      },
      {
        title: "Комментарий",
        width: 160,
        ellipsis: true,
        render: (_, r) => r.admin_payout_note ?? "—",
      },
      { title: "Заказы", dataIndex: "orders_count", width: 78 },
      {
        title: "GMV",
        dataIndex: "gmv",
        width: 120,
        render: (v: number) => `${v.toLocaleString("ru-RU")} ₽`,
      },
      {
        title: "Комиссия",
        dataIndex: "commission",
        width: 120,
        render: (v: number) => (
          <Tag color="blue">{v.toLocaleString("ru-RU")} ₽</Tag>
        ),
      },
      {
        title: "К выплате",
        dataIndex: "payout_amount",
        width: 120,
        render: (v: number) => (
          <Tag color="green">{v.toLocaleString("ru-RU")} ₽</Tag>
        ),
      },
    ];
    if (canEditPayout) {
      base.push({
        title: "Действия",
        key: "payout_action",
        width: 120,
        fixed: "right",
        render: (_, r) => (
          <Button size="small" type="link" onClick={() => openPayout(r)}>
            Выплата
          </Button>
        ),
      });
    }
    return base;
  }, [canEditPayout]);

  const totals = useMemo(() => {
    const rows = data?.items ?? [];
    return rows.reduce(
      (acc, r) => {
        acc.gmv += r.gmv;
        acc.commission += r.commission;
        acc.payout += r.payout_amount;
        return acc;
      },
      { gmv: 0, commission: 0, payout: 0 },
    );
  }, [data?.items]);

  return (
    <Space direction="vertical" size={16} style={{ width: "100%" }}>
      <Card>
        <Space direction="vertical" size={12} style={{ width: "100%" }}>
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
              placeholder="Поиск по продавцу / email / телефону / компании"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: 360 }}
            />
            <Typography.Text type="secondary">
              Ставка комиссии:{" "}
              {((data?.meta?.commission_rate ?? 0) * 100).toFixed(2)}%
            </Typography.Text>
            {canEditPayout ? (
              <Button type="primary" onClick={() => void downloadCsv()}>
                Скачать CSV
              </Button>
            ) : null}
          </Space>
          {data?.meta?.calculation_note ? (
            <Alert type="info" showIcon message={data.meta.calculation_note} />
          ) : null}
          {!canEditPayout ? (
            <Alert
              type="warning"
              showIcon
              message="Нет права admin.finance.edit — только просмотр; экспорт и отметки по выплатам недоступны"
            />
          ) : null}
        </Space>
      </Card>

      <Space wrap size={16}>
        <Card>
          <Statistic title="GMV" value={totals.gmv} suffix="₽" precision={2} />
        </Card>
        <Card>
          <Statistic
            title="Комиссия"
            value={totals.commission}
            suffix="₽"
            precision={2}
          />
        </Card>
        <Card>
          <Statistic
            title="К выплате"
            value={totals.payout}
            suffix="₽"
            precision={2}
          />
        </Card>
      </Space>

      <Card title="Финансы по продавцам">
        <Table<SellerFinanceRow>
          rowKey={(r) => String(r.seller_id)}
          columns={columns}
          dataSource={data?.items ?? []}
          loading={isLoading}
          pagination={{ pageSize: 20 }}
          scroll={{ x: canEditPayout ? 1680 : 1560 }}
          size="small"
        />
      </Card>

      <Drawer
        title={
          payoutRow
            ? `Выплата: ${payoutRow.seller_name} (#${payoutRow.seller_id})`
            : "Выплата"
        }
        width={420}
        open={payoutRow !== null}
        onClose={() => setPayoutRow(null)}
        extra={
          <Button type="primary" onClick={() => void savePayout()}>
            Сохранить
          </Button>
        }
      >
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <div>
            <Typography.Text
              type="secondary"
              style={{ display: "block", marginBottom: 6 }}
            >
              Статус (для бухгалтерии)
            </Typography.Text>
            <Select
              allowClear
              placeholder="Сбросить"
              style={{ width: "100%" }}
              value={payoutStatus || undefined}
              options={[...PAYOUT_STATUS_OPTIONS]}
              onChange={(v) => setPayoutStatus(v ?? "")}
            />
            <Typography.Paragraph
              type="secondary"
              style={{ fontSize: 12, marginTop: 6, marginBottom: 0 }}
            >
              Пусто = сброс отметки. Не списывает деньги — только учёт.
            </Typography.Paragraph>
          </div>
          <div>
            <Typography.Text
              type="secondary"
              style={{ display: "block", marginBottom: 6 }}
            >
              Комментарий
            </Typography.Text>
            <Input.TextArea
              rows={4}
              value={payoutNote}
              onChange={(e) => setPayoutNote(e.target.value)}
              placeholder="Номер реестра, дата отправки в банк, ссылка на оплату"
            />
          </div>
          {payoutRow?.admin_payout_marked_at ? (
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              Обновлено: {String(payoutRow.admin_payout_marked_at)}
            </Typography.Text>
          ) : null}
        </Space>
      </Drawer>
    </Space>
  );
}
