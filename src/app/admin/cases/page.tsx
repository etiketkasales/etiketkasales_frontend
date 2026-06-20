"use client";

import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Alert,
  App,
  Button,
  Card,
  Drawer,
  Input,
  Segmented,
  Select,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { apiClient } from "~/src/shared/lib/api/client.api";
import { useAdminPermission } from "~/src/refine/admin/useAdminPermission";
import { parseAxiosApiValidation } from "~/src/shared/lib/functions/shared.func";

type CaseKind = "returns" | "appeals";

type AppealRow = {
  id: number;
  type?: string;
  title?: string;
  message?: string;
  created_at?: string;
  email?: string;
  phone?: string;
  admin_case_status?: string | null;
  admin_case_note?: string | null;
  admin_case_updated_at?: string | null;
};

type ReturnRow = {
  id: number;
  order_number?: string;
  status?: string;
  payment_status?: string;
  total_amount?: number;
  created_at?: string;
  email?: string;
  phone?: string;
  admin_return_case_status?: string | null;
  admin_return_case_note?: string | null;
  admin_return_case_updated_at?: string | null;
};

const STATUS_OPTIONS = [
  { value: "open", label: "Открыт" },
  { value: "in_progress", label: "В работе" },
  { value: "resolved", label: "Решён" },
  { value: "closed", label: "Закрыт" },
] as const;

function caseStatusRu(code?: string | null): string {
  const c = code && code !== "" ? code : "open";
  const m: Record<string, string> = {
    open: "Открыт",
    in_progress: "В работе",
    resolved: "Решён",
    closed: "Закрыт",
  };
  return m[c] ?? c;
}

function caseStatusColor(code?: string | null): string {
  const c = code && code !== "" ? code : "open";
  if (c === "resolved") return "green";
  if (c === "closed") return "default";
  if (c === "in_progress") return "processing";
  return "blue";
}

export default function AdminCasesPage() {
  const { message: msgApi } = App.useApp();
  const queryClient = useQueryClient();
  const [kind, setKind] = useState<CaseKind>("returns");
  const [search, setSearch] = useState<string>("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editStatus, setEditStatus] = useState<string>("open");
  const [editNote, setEditNote] = useState<string>("");
  const [activeAppeal, setActiveAppeal] = useState<AppealRow | null>(null);
  const [activeReturn, setActiveReturn] = useState<ReturnRow | null>(null);

  const canEditCase = useAdminPermission("admin.orders.edit");

  const { data, isLoading } = useQuery({
    queryKey: ["admin-cases", kind, search],
    queryFn: async () => {
      const res = await apiClient.get<{
        success: boolean;
        data: { items: Record<string, unknown>[] };
      }>("/admin/cases", { params: { kind, search: search || undefined } });
      return res.data.data.items ?? [];
    },
  });

  const openDrawer = (row: Record<string, unknown>) => {
    if (kind === "appeals") {
      const a = row as unknown as AppealRow;
      setActiveAppeal(a);
      setActiveReturn(null);
      setEditStatus(
        a.admin_case_status && a.admin_case_status !== ""
          ? a.admin_case_status
          : "open",
      );
      setEditNote(a.admin_case_note ?? "");
    } else {
      const r = row as unknown as ReturnRow;
      setActiveReturn(r);
      setActiveAppeal(null);
      setEditStatus(
        r.admin_return_case_status && r.admin_return_case_status !== ""
          ? r.admin_return_case_status
          : "open",
      );
      setEditNote(r.admin_return_case_note ?? "");
    }
    setDrawerOpen(true);
  };

  const saveCase = async () => {
    if (!canEditCase) return;
    try {
      if (kind === "appeals" && activeAppeal) {
        await apiClient.put(`/admin/cases/appeals/${activeAppeal.id}`, {
          status: editStatus,
          note: editNote.trim() === "" ? null : editNote.trim(),
        });
      } else if (kind === "returns" && activeReturn) {
        await apiClient.put(`/admin/cases/returns/${activeReturn.id}`, {
          status: editStatus,
          note: editNote.trim() === "" ? null : editNote.trim(),
        });
      } else {
        return;
      }
      msgApi.success("Сохранено");
      setDrawerOpen(false);
      await queryClient.invalidateQueries({ queryKey: ["admin-cases"] });
    } catch (e) {
      const p = parseAxiosApiValidation(e);
      msgApi.error(p.message || "Ошибка сохранения");
    }
  };

  const columns: ColumnsType<Record<string, unknown>> = useMemo(() => {
    if (kind === "appeals") {
      return [
        { title: "ID", dataIndex: "id", width: 72 },
        {
          title: "Кейс",
          width: 150,
          render: (_: unknown, r) => {
            const x = r as AppealRow;
            return (
              <Tag color={caseStatusColor(x.admin_case_status)}>
                {caseStatusRu(x.admin_case_status)}
              </Tag>
            );
          },
        },
        {
          title: "Тип",
          dataIndex: "type",
          width: 140,
          render: (v?: string) => <Tag color="purple">{v || "appeal"}</Tag>,
        },
        { title: "Пользователь", dataIndex: "email", width: 220 },
        { title: "Телефон", dataIndex: "phone", width: 150 },
        { title: "Заголовок", dataIndex: "title", width: 220, ellipsis: true },
        { title: "Сообщение", dataIndex: "message", ellipsis: true },
        { title: "Дата", dataIndex: "created_at", width: 170 },
      ];
    }

    return [
      { title: "ID", dataIndex: "id", width: 72 },
      {
        title: "Кейс",
        width: 150,
        render: (_: unknown, r) => {
          const x = r as ReturnRow;
          return (
            <Tag color={caseStatusColor(x.admin_return_case_status)}>
              {caseStatusRu(x.admin_return_case_status)}
            </Tag>
          );
        },
      },
      { title: "Заказ", dataIndex: "order_number", width: 170 },
      {
        title: "Статус",
        dataIndex: "status",
        width: 110,
        render: (v?: string) => (
          <Tag color={v === "refunded" ? "red" : "gold"}>{v || "—"}</Tag>
        ),
      },
      { title: "Оплата", dataIndex: "payment_status", width: 120 },
      { title: "Сумма", dataIndex: "total_amount", width: 120 },
      { title: "Пользователь", dataIndex: "email", width: 200 },
      { title: "Телефон", dataIndex: "phone", width: 150 },
      { title: "Дата", dataIndex: "created_at", width: 170 },
    ];
  }, [kind]);

  return (
    <Space direction="vertical" size={16} style={{ width: "100%" }}>
      <Card>
        <Space wrap>
          <Segmented
            value={kind}
            options={[
              { label: "Возвраты", value: "returns" },
              { label: "Обращения", value: "appeals" },
            ]}
            onChange={(v) => {
              setKind(v as CaseKind);
              setDrawerOpen(false);
            }}
          />
          <Input.Search
            allowClear
            placeholder="Поиск по номеру заказа / email / телефону"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: 360 }}
          />
        </Space>
      </Card>

      <Card
        title={kind === "returns" ? "Кейсы возвратов" : "Кейсы обращений"}
        extra={
          <Typography.Text type="secondary">
            Клик по строке — статус и комментарий для внутреннего учёта
          </Typography.Text>
        }
      >
        <Table
          rowKey={(r) => String((r as { id?: number }).id)}
          columns={columns}
          dataSource={data ?? []}
          loading={isLoading}
          pagination={{ pageSize: 20 }}
          scroll={{ x: 1200 }}
          size="small"
          onRow={(record) => ({
            onClick: () => openDrawer(record),
            style: { cursor: "pointer" },
          })}
        />
      </Card>

      <Drawer
        title={
          kind === "appeals"
            ? `Обращение #${activeAppeal?.id ?? "—"}`
            : `Возврат, заказ #${activeReturn?.order_number ?? activeReturn?.id ?? "—"}`
        }
        width={480}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        extra={
          canEditCase ? (
            <Button type="primary" onClick={() => void saveCase()}>
              Сохранить
            </Button>
          ) : null
        }
      >
        {!canEditCase ? (
          <Alert
            type="info"
            showIcon
            message="Нет права admin.orders.edit — только просмотр"
            style={{ marginBottom: 12 }}
          />
        ) : null}
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          {kind === "appeals" && activeAppeal?.admin_case_updated_at ? (
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              Обновлено: {String(activeAppeal.admin_case_updated_at)}
            </Typography.Text>
          ) : null}
          {kind === "returns" && activeReturn?.admin_return_case_updated_at ? (
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              Обновлено: {String(activeReturn.admin_return_case_updated_at)}
            </Typography.Text>
          ) : null}
          <div>
            <Typography.Text
              type="secondary"
              style={{ display: "block", marginBottom: 6 }}
            >
              Статус кейса
            </Typography.Text>
            <Select
              style={{ width: "100%" }}
              value={editStatus}
              options={[...STATUS_OPTIONS]}
              onChange={setEditStatus}
              disabled={!canEditCase}
            />
          </div>
          <div>
            <Typography.Text
              type="secondary"
              style={{ display: "block", marginBottom: 6 }}
            >
              Комментарий для команды (не виден покупателю)
            </Typography.Text>
            <Input.TextArea
              rows={5}
              value={editNote}
              onChange={(e) => setEditNote(e.target.value)}
              disabled={!canEditCase}
              placeholder="Кратко: что сделали, ссылка на тикет, договорённости"
            />
          </div>
        </Space>
      </Drawer>
    </Space>
  );
}
