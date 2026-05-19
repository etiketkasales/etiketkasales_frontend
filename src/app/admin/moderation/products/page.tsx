"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  App,
  Button,
  Card,
  Input,
  Modal,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiClient } from "~/src/shared/lib/api/client.api";
import { useAdminPermission } from "~/src/refine/admin/useAdminPermission";
import {
  approveProduct,
  bulkModerationAction,
  rejectProduct,
} from "~/src/features/admin/lib/adminProductModeration";
import { parseAxiosApiValidation } from "~/src/shared/lib/functions/shared.func";
import { formatRub } from "~/src/shared/lib/format-currency";

type QueueItem = {
  id: number;
  name: string;
  user_id: number;
  seller_name?: string | null;
  seller_email?: string | null;
  category_id: number;
  category_name?: string | null;
  status: string;
  price: number;
  created_at: string;
};

export default function AdminModerationProductsPage() {
  const router = useRouter();
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [limit] = useState(30);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejectId, setRejectId] = useState<number | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [busyId, setBusyId] = useState<number | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [bulkBusy, setBulkBusy] = useState(false);
  const [bulkRejectOpen, setBulkRejectOpen] = useState(false);
  const [bulkRejectReason, setBulkRejectReason] = useState("");

  const canModerate = useAdminPermission("admin.moderation.edit");

  const { data, isLoading } = useQuery({
    queryKey: ["admin-moderation-queue", page, limit],
    queryFn: async () => {
      const res = await apiClient.get<{
        success: boolean;
        data?: {
          items: QueueItem[];
          pagination: {
            total: number;
            current_page: number;
            per_page: number;
          };
        };
      }>("/admin/moderation/queue", {
        params: { type: "products", page, limit },
      });
      if (!res.data.success || !res.data.data) {
        throw new Error("Очередь недоступна");
      }
      return res.data.data;
    },
  });

  const items = data?.items ?? [];
  const total = data?.pagination?.total ?? 0;

  const invalidateAll = async () => {
    await queryClient.invalidateQueries({
      queryKey: ["admin-moderation-queue"],
    });
    await queryClient.invalidateQueries({
      queryKey: ["default", "list", "products"],
    });
  };

  const approve = async (id: number) => {
    if (!canModerate) {
      message.warning("Нет права admin.moderation.edit");
      return;
    }
    setBusyId(id);
    try {
      await approveProduct(id);
      message.success("Товар одобрен");
      await invalidateAll();
    } catch (e: unknown) {
      message.error(parseAxiosApiValidation(e).message || "Ошибка");
    } finally {
      setBusyId(null);
    }
  };

  const openReject = (id: number) => {
    setRejectId(id);
    setRejectReason("");
    setRejectOpen(true);
  };

  const confirmReject = async () => {
    if (!rejectId || !canModerate) return;
    const reason = rejectReason.trim();
    if (!reason) {
      message.error("Укажите причину отклонения");
      return;
    }
    setBusyId(rejectId);
    try {
      await rejectProduct(rejectId, reason);
      message.success("Отклонено");
      setRejectOpen(false);
      await invalidateAll();
    } catch (e: unknown) {
      message.error(parseAxiosApiValidation(e).message || "Ошибка");
    } finally {
      setBusyId(null);
    }
  };

  const runBulk = async (action: "approve" | "reject", reason = "") => {
    if (!canModerate) return;
    if (!selectedIds.length) {
      message.warning("Выберите товары в таблице");
      return;
    }
    if (action === "reject" && !reason.trim()) {
      message.error("Укажите причину отклонения");
      return;
    }
    setBulkBusy(true);
    try {
      const res = await bulkModerationAction(
        action,
        selectedIds,
        reason.trim(),
      );
      message.success(res.message ?? "Готово");
      setSelectedIds([]);
      setBulkRejectOpen(false);
      setBulkRejectReason("");
      await invalidateAll();
    } catch (e: unknown) {
      message.error(parseAxiosApiValidation(e).message || "Ошибка");
    } finally {
      setBulkBusy(false);
    }
  };

  const columns: ColumnsType<QueueItem> = [
    { title: "ID", dataIndex: "id", width: 72 },
    {
      title: "Товар",
      dataIndex: "name",
      ellipsis: true,
      render: (text: string, row) => (
        <Button
          type="link"
          onClick={(e) => {
            e.stopPropagation();
            router.push(
              `/admin/products?product=${encodeURIComponent(String(row.id))}`,
            );
          }}
        >
          {text}
        </Button>
      ),
    },
    {
      title: "Продавец",
      render: (_, row) => (
        <span>
          {row.seller_name ?? "—"}{" "}
          <Typography.Text type="secondary">#{row.user_id}</Typography.Text>
        </span>
      ),
    },
    {
      title: "Категория",
      render: (_, row) => `${row.category_name ?? "—"} (#${row.category_id})`,
    },
    {
      title: "Цена",
      dataIndex: "price",
      render: (v: number) => formatRub(v),
    },
    {
      title: "Статус",
      dataIndex: "status",
      render: (v: string) => <Tag color="orange">{v}</Tag>,
    },
    {
      title: "Создан",
      dataIndex: "created_at",
    },
    {
      title: "Действия",
      key: "actions",
      width: 220,
      render: (_, row) => (
        <Space onClick={(e) => e.stopPropagation()}>
          <Button
            type="primary"
            size="small"
            disabled={!canModerate}
            loading={busyId === row.id}
            onClick={() => approve(row.id)}
          >
            Одобрить
          </Button>
          <Button
            danger
            size="small"
            disabled={!canModerate}
            loading={busyId === row.id}
            onClick={() => openReject(row.id)}
          >
            Отклонить
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Space direction="vertical" size={16} style={{ width: "100%" }}>
      <Typography.Title level={4} style={{ marginTop: 0 }}>
        Очередь модерации товаров
      </Typography.Title>
      {!canModerate ? (
        <Typography.Paragraph type="warning">
          У вас есть только просмотр очереди (нет admin.moderation.edit).
        </Typography.Paragraph>
      ) : null}

      <Card>
        <Space wrap style={{ marginBottom: 16 }}>
          <Link href="/admin/products">
            <Button>Все товары</Button>
          </Link>
          {canModerate && selectedIds.length > 0 ? (
            <>
              <Typography.Text type="secondary">
                Выбрано: {selectedIds.length}
              </Typography.Text>
              <Button
                type="primary"
                loading={bulkBusy}
                onClick={() => void runBulk("approve")}
              >
                Одобрить выбранные
              </Button>
              <Button
                danger
                loading={bulkBusy}
                onClick={() => setBulkRejectOpen(true)}
              >
                Отклонить выбранные
              </Button>
            </>
          ) : null}
        </Space>

        <Table<QueueItem>
          rowKey="id"
          loading={isLoading}
          columns={columns}
          dataSource={items}
          rowSelection={
            canModerate
              ? {
                  selectedRowKeys: selectedIds,
                  onChange: (keys) => setSelectedIds(keys.map(Number)),
                }
              : undefined
          }
          pagination={{
            current: page,
            pageSize: limit,
            total,
            onChange: (p) => setPage(p),
            showSizeChanger: false,
          }}
        />
      </Card>

      <Modal
        title="Причина отклонения"
        open={rejectOpen}
        onCancel={() => setRejectOpen(false)}
        onOk={confirmReject}
        okButtonProps={{ loading: rejectId !== null && busyId === rejectId }}
      >
        <Input.TextArea
          rows={4}
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
          placeholder="Обязательно для модератора"
        />
      </Modal>

      <Modal
        title="Отклонить выбранные товары"
        open={bulkRejectOpen}
        onCancel={() => setBulkRejectOpen(false)}
        onOk={() => void runBulk("reject", bulkRejectReason)}
        okButtonProps={{ loading: bulkBusy }}
      >
        <Input.TextArea
          rows={4}
          value={bulkRejectReason}
          onChange={(e) => setBulkRejectReason(e.target.value)}
          placeholder="Причина для всех выбранных"
        />
      </Modal>
    </Space>
  );
}
