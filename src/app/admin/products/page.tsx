"use client";

import { useEffect, useState, type MouseEvent } from "react";
import type { TableProps } from "antd";
import {
  App,
  Button,
  Card,
  Drawer,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { getDefaultSortOrder } from "@refinedev/antd";
import { useAdminTable } from "~/src/refine/admin/useAdminTable";
import { useAdminPermission } from "~/src/refine/admin/useAdminPermission";
import { useRefineSearchFilterValue } from "~/src/refine/admin/useRefineSearchFilterValue";
import {
  bulkProductAction,
  type BulkProductAction,
} from "~/src/features/admin/lib/adminProductModeration";
import { formatRub } from "~/src/shared/lib/format-currency";
import { parseAxiosApiValidation } from "~/src/shared/lib/functions/shared.func";
import { AdminProductForm } from "./admin-product-form";

type ProductRow = {
  id: number;
  name: string;
  user_id: number;
  category_id: number;
  category_name?: string | null;
  seller_name?: string | null;
  status: string;
  /** 0 | 1 или строка из PDO */
  is_active?: number | boolean | string;
  price: number;
  stock_quantity?: number;
  variants_count?: number;
  created_at: string;
};

const STATUS_OPTIONS = [
  { label: "pending", value: "pending" },
  { label: "approved", value: "approved" },
  { label: "rejected", value: "rejected" },
  { label: "draft", value: "draft" },
  { label: "archived", value: "archived" },
];

function visibilityLabel(row: ProductRow): string {
  const s = row.status;
  const on =
    row.is_active === 1 || row.is_active === true || row.is_active === "1";
  if (s === "approved" && on) return "на витрине";
  if (s === "approved" && !on) return "скрыт";
  if (s === "pending") return "на модерации";
  if (s === "draft") return "черновик";
  if (s === "rejected") return "отклонён";
  if (s === "archived") return "архив";
  return s;
}

type ProductDrawerState =
  | { kind: "closed" }
  | { kind: "create" }
  | { kind: "edit"; id: number };

export default function AdminProductsPage() {
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const [drawer, setDrawer] = useState<ProductDrawerState>({ kind: "closed" });
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [bulkBusy, setBulkBusy] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const canEdit = useAdminPermission("admin.catalog.products.edit");
  const canModerate = useAdminPermission("admin.moderation.edit");

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

  /**
   * /admin/products?product=123 — открыть карточку (модерация и внешние ссылки).
   * /admin/products?create=1 — форма создания (редирект с /admin/products/new).
   */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const qs = new URLSearchParams(window.location.search);
    let changed = false;
    if (qs.get("create") === "1") {
      setDrawer({ kind: "create" });
      qs.delete("create");
      changed = true;
    }
    const raw = qs.get("product");
    if (raw) {
      const id = parseInt(raw, 10);
      if (Number.isFinite(id) && id >= 1) {
        setDrawer({ kind: "edit", id });
        qs.delete("product");
        changed = true;
      }
    }
    if (!changed) return;
    const tail = qs.toString();
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${tail ? `?${tail}` : ""}`,
    );
  }, []);

  const openProduct = (id: number) => setDrawer({ kind: "edit", id });

  const tp = tableProps as TableProps<ProductRow>;
  const { onRow: tableOnRow, ...tableRest } = tp;

  const invalidateProductList = () =>
    void queryClient.invalidateQueries({
      queryKey: ["default", "list", "products"],
    });

  const runBulk = async (action: BulkProductAction, reason = "") => {
    if (!selectedIds.length) {
      message.warning("Выберите товары в таблице");
      return;
    }
    if (!canEdit && action !== "approve" && action !== "reject") {
      message.warning("Нет права admin.catalog.products.edit");
      return;
    }
    if (
      (action === "approve" || action === "reject") &&
      !canModerate &&
      !canEdit
    ) {
      message.warning("Нет права на модерацию");
      return;
    }
    setBulkBusy(true);
    try {
      const res = await bulkProductAction(action, selectedIds, reason);
      message.success(res.message ?? "Готово");
      setSelectedIds([]);
      setRejectOpen(false);
      setRejectReason("");
      invalidateProductList();
      await queryClient.invalidateQueries({
        queryKey: ["admin-moderation-queue"],
      });
    } catch (e) {
      message.error(parseAxiosApiValidation(e).message || "Ошибка");
    } finally {
      setBulkBusy(false);
    }
  };

  return (
    <Space direction="vertical" size={16} style={{ width: "100%" }}>
      {hiddenSearchForm}
      <Card>
        <Space style={{ marginBottom: 16 }} wrap>
          {canEdit ? (
            <Button
              type="primary"
              onClick={() => setDrawer({ kind: "create" })}
            >
              Новый товар
            </Button>
          ) : null}
          <Link href="/admin/moderation/products">
            <Button>Очередь модерации</Button>
          </Link>
          {canEdit ? (
            <Link href="/admin/products/import">
              <Button>Импорт CSV</Button>
            </Link>
          ) : null}
          {(canEdit || canModerate) && selectedIds.length > 0 ? (
            <>
              <Typography.Text type="secondary">
                Выбрано: {selectedIds.length}
              </Typography.Text>
              <Button
                type="primary"
                loading={bulkBusy}
                disabled={!canModerate && !canEdit}
                onClick={() => void runBulk("approve")}
              >
                Одобрить
              </Button>
              <Button
                danger
                loading={bulkBusy}
                onClick={() => setRejectOpen(true)}
              >
                Отклонить
              </Button>
              <Button loading={bulkBusy} onClick={() => void runBulk("hide")}>
                Скрыть с витрины
              </Button>
            </>
          ) : null}
        </Space>
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
        {...tableRest}
        rowKey="id"
        rowSelection={
          canEdit || canModerate
            ? {
                selectedRowKeys: selectedIds,
                onChange: (keys) => setSelectedIds(keys.map(Number)),
              }
            : undefined
        }
        pagination={{ ...tableProps.pagination, showSizeChanger: true }}
        onRow={(record, index) => {
          const base =
            typeof tableOnRow === "function"
              ? tableOnRow(record, index)
              : ({} as Record<string, unknown>);
          const baseOnClick = base.onClick as
            | ((e: MouseEvent<HTMLElement>) => void)
            | undefined;
          return {
            ...base,
            onClick: (e: MouseEvent<HTMLElement>) => {
              baseOnClick?.(e);
              const el = e.target as HTMLElement;
              if (
                el.closest("button, a, input, textarea, select") ||
                el.closest(".ant-checkbox, .ant-checkbox-wrapper") ||
                el.closest(".ant-pagination")
              ) {
                return;
              }
              openProduct(record.id);
            },
            style: {
              cursor: "pointer",
              ...(base.style as object | undefined),
            },
          };
        }}
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
          render={(name: string) => name}
        />
        <Table.Column<ProductRow>
          title="Витрина"
          width={120}
          render={(_, row) => <Tag>{visibilityLabel(row)}</Tag>}
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
          title="Варианты"
          width={88}
          render={(_, row) =>
            Number(row.variants_count ?? 0) > 0 ? (
              <Tag color="blue">{row.variants_count}</Tag>
            ) : (
              <Typography.Text type="secondary">—</Typography.Text>
            )
          }
        />
        <Table.Column<ProductRow>
          key="created_at"
          dataIndex="created_at"
          title="Создан"
          sorter
        />
      </Table>

      <Drawer
        width={960}
        destroyOnHidden
        styles={{ body: { paddingTop: 8, overflowY: "auto" } }}
        open={drawer.kind !== "closed"}
        onClose={() => setDrawer({ kind: "closed" })}
        title={
          drawer.kind === "create"
            ? "Новый товар"
            : drawer.kind === "edit"
              ? `Товар #${drawer.id}`
              : ""
        }
      >
        {drawer.kind === "create" ? (
          <AdminProductForm
            mode="create"
            embedded
            onClose={() => setDrawer({ kind: "closed" })}
            onCreated={(id) => setDrawer({ kind: "edit", id })}
            onAfterSave={invalidateProductList}
          />
        ) : null}
        {drawer.kind === "edit" ? (
          <AdminProductForm
            mode="edit"
            productId={drawer.id}
            embedded
            onClose={() => setDrawer({ kind: "closed" })}
            onAfterSave={invalidateProductList}
          />
        ) : null}
      </Drawer>

      <Modal
        title="Причина отклонения (для всех выбранных)"
        open={rejectOpen}
        onCancel={() => setRejectOpen(false)}
        onOk={() => {
          const reason = rejectReason.trim();
          if (!reason) {
            message.error("Укажите причину");
            return;
          }
          void runBulk("reject", reason);
        }}
        okButtonProps={{ loading: bulkBusy }}
      >
        <Input.TextArea
          rows={4}
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
          placeholder="Обязательно для отклонения"
        />
      </Modal>
    </Space>
  );
}
