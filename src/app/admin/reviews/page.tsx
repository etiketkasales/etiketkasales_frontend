"use client";

import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  App,
  Button,
  Card,
  Drawer,
  Image,
  Input,
  Rate,
  Select,
  Space,
  Table,
  Tabs,
  Tag,
  Typography,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { apiClient } from "~/src/shared/lib/api/client.api";
import { useAdminPermission } from "~/src/refine/admin/useAdminPermission";
import { parseAxiosApiValidation } from "~/src/shared/lib/functions/shared.func";

type ReviewRow = {
  id: number;
  product_id: number;
  product_name?: string;
  seller_name?: string;
  user_name?: string;
  user_phone?: string;
  rating: number;
  title?: string | null;
  comment?: string | null;
  pros?: string | null;
  cons?: string | null;
  photos?: { url: string }[];
  moderation_status: string;
  is_published: boolean | number;
  is_verified: boolean | number;
  seller_reply?: string | null;
  admin_note?: string | null;
  created_at: string;
};

type ComplaintRow = {
  id: number;
  review_id: number;
  product_name?: string;
  rating?: number;
  review_comment?: string | null;
  reason: string;
  status: string;
  reporter_name?: string;
  created_at: string;
};

const MOD_STATUS: Record<string, { color: string; label: string }> = {
  pending: { color: "gold", label: "На модерации" },
  approved: { color: "green", label: "Одобрен" },
  rejected: { color: "red", label: "Отклонён" },
  hidden: { color: "default", label: "Скрыт" },
};

function modTag(status: string) {
  const m = MOD_STATUS[status] ?? { color: "default", label: status };
  return <Tag color={m.color}>{m.label}</Tag>;
}

function stopRowClick(e: React.MouseEvent) {
  e.stopPropagation();
}

export default function AdminReviewsPage() {
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const canView = useAdminPermission("admin.reviews.view");
  const canEdit = useAdminPermission("admin.reviews.edit");

  const [tab, setTab] = useState("pending");
  const [modFilter, setModFilter] = useState<string>("");
  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState<number | undefined>();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [drawerId, setDrawerId] = useState<number | null>(null);
  const [adminNote, setAdminNote] = useState("");

  const [complaintStatus, setComplaintStatus] = useState("pending");
  const [complaintId, setComplaintId] = useState<number | null>(null);
  const [complaintNote, setComplaintNote] = useState("");
  const [hideReviewOnComplaint, setHideReviewOnComplaint] = useState(true);

  const queueStatus = tab === "pending" ? "pending" : modFilter || undefined;

  const reviewsQuery = useQuery({
    queryKey: ["admin-reviews", tab, queueStatus, search, ratingFilter],
    queryFn: async () => {
      const res = await apiClient.get<{
        success: boolean;
        data?: {
          items: ReviewRow[];
          pending_total?: number;
          pagination?: { total: number };
        };
      }>("/admin/reviews", {
        params: {
          moderation_status: queueStatus,
          search: search || undefined,
          rating: ratingFilter,
          limit: 50,
        },
      });
      return (
        res.data.data ?? {
          items: [],
          pending_total: 0,
          pagination: { total: 0 },
        }
      );
    },
    enabled: canView && tab !== "complaints",
  });

  const drawerDetailQuery = useQuery({
    queryKey: ["admin-review", drawerId],
    queryFn: async () => {
      const res = await apiClient.get<{
        success: boolean;
        data?: { review: ReviewRow };
      }>(`/admin/reviews/${drawerId}`);
      return res.data.data?.review ?? null;
    },
    enabled: canView && drawerId != null,
  });

  const complaintsQuery = useQuery({
    queryKey: ["admin-review-complaints", complaintStatus],
    queryFn: async () => {
      const res = await apiClient.get<{
        success: boolean;
        data?: { items: ComplaintRow[]; pending_total?: number };
      }>("/admin/reviews/complaints", {
        params: { status: complaintStatus || undefined, limit: 50 },
      });
      return res.data.data ?? { items: [], pending_total: 0 };
    },
    enabled: canView && tab === "complaints",
  });

  const drawerReview = useMemo(() => {
    if (drawerId == null) return null;
    const fromList = reviewsQuery.data?.items?.find((r) => r.id === drawerId);
    return drawerDetailQuery.data ?? fromList ?? null;
  }, [drawerId, reviewsQuery.data?.items, drawerDetailQuery.data]);

  const openDrawer = (id: number) => {
    setDrawerId(id);
    const row = reviewsQuery.data?.items?.find((r) => r.id === id);
    setAdminNote(row?.admin_note?.trim() ?? "");
  };

  const moderate = async (id: number, action: string) => {
    try {
      await apiClient.put(`/admin/reviews/${id}`, {
        action,
        admin_note: adminNote || undefined,
      });
      message.success("Сохранено");
      await queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
      await queryClient.invalidateQueries({ queryKey: ["admin-review", id] });
    } catch (e) {
      message.error(parseAxiosApiValidation(e).message || "Ошибка");
    }
  };

  const bulk = async (action: string) => {
    if (selectedIds.length === 0) return;
    try {
      await apiClient.post("/admin/reviews/bulk", {
        ids: selectedIds,
        action,
        admin_note: adminNote || undefined,
      });
      message.success(`Обработано: ${selectedIds.length}`);
      setSelectedIds([]);
      await queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
    } catch (e) {
      message.error(parseAxiosApiValidation(e).message || "Ошибка");
    }
  };

  const saveComplaint = async (status: "reviewed" | "dismissed") => {
    if (!complaintId) return;
    try {
      await apiClient.put(`/admin/reviews/complaints/${complaintId}`, {
        status,
        admin_note: complaintNote,
        hide_review: hideReviewOnComplaint && status === "reviewed",
      });
      message.success("Сохранено");
      setComplaintId(null);
      setComplaintNote("");
      await queryClient.invalidateQueries({
        queryKey: ["admin-review-complaints"],
      });
      await queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
    } catch (e) {
      message.error(parseAxiosApiValidation(e).message || "Ошибка");
    }
  };

  const tableRowProps = (record: ReviewRow) => ({
    onClick: () => openDrawer(record.id),
    style: { cursor: "pointer" } as const,
  });

  const reviewColumns: ColumnsType<ReviewRow> = [
    { title: "ID", dataIndex: "id", width: 70 },
    {
      title: "Товар",
      dataIndex: "product_name",
      render: (_, r) => (
        <Link href={`/admin/products/${r.product_id}`} onClick={stopRowClick}>
          {r.product_name ?? r.product_id}
        </Link>
      ),
    },
    {
      title: "Оценка",
      dataIndex: "rating",
      width: 120,
      render: (v: number) => <Rate disabled value={v} />,
    },
    {
      title: "Текст",
      key: "text",
      ellipsis: true,
      render: (_, r) =>
        r.comment?.trim() ||
        r.title?.trim() || (
          <Typography.Text type="secondary">Только оценка</Typography.Text>
        ),
    },
    {
      title: "Фото",
      key: "photos",
      width: 70,
      render: (_, r) => (r.photos?.length ? <Tag>{r.photos.length}</Tag> : "—"),
    },
    {
      title: "Статус",
      dataIndex: "moderation_status",
      width: 130,
      render: (s: string) => modTag(s),
    },
    {
      title: "Автор",
      key: "user",
      render: (_, r) => r.user_name || r.user_phone || "—",
    },
    {
      title: "Дата",
      dataIndex: "created_at",
      width: 110,
      render: (v: string) =>
        v ? new Date(v).toLocaleDateString("ru-RU") : "—",
    },
    {
      title: "",
      key: "open",
      width: 90,
      render: (_, r) => (
        <Button
          size="small"
          onClick={(e) => {
            stopRowClick(e);
            openDrawer(r.id);
          }}
        >
          Открыть
        </Button>
      ),
    },
  ];

  const complaintColumns: ColumnsType<ComplaintRow> = [
    { title: "ID", dataIndex: "id", width: 70 },
    { title: "Отзыв", dataIndex: "review_id", width: 80 },
    { title: "Товар", dataIndex: "product_name", ellipsis: true },
    {
      title: "Оценка",
      dataIndex: "rating",
      width: 90,
      render: (v?: number) => (v ? <Rate disabled value={v} /> : "—"),
    },
    { title: "Причина", dataIndex: "reason", ellipsis: true },
    {
      title: "Статус",
      dataIndex: "status",
      width: 110,
      render: (s: string) => <Tag>{s}</Tag>,
    },
    {
      title: "",
      width: 100,
      render: (_, r) => (
        <Button size="small" onClick={() => setComplaintId(r.id)}>
          Разобрать
        </Button>
      ),
    },
  ];

  if (!canView) {
    return (
      <Card>
        <Typography.Text type="secondary">
          Нет доступа к разделу отзывов.
        </Typography.Text>
      </Card>
    );
  }

  const pendingTotal = reviewsQuery.data?.pending_total ?? 0;

  const reviewsTable = (
    <Table
      rowKey="id"
      loading={reviewsQuery.isLoading}
      dataSource={reviewsQuery.data?.items ?? []}
      columns={reviewColumns}
      rowSelection={
        canEdit && tab === "pending"
          ? {
              selectedRowKeys: selectedIds,
              onChange: (keys) => setSelectedIds(keys as number[]),
            }
          : undefined
      }
      onRow={tableRowProps}
      pagination={false}
      size="small"
    />
  );

  return (
    <div style={{ padding: 24 }}>
      <Typography.Title level={3} style={{ marginTop: 0 }}>
        Отзывы и рейтинг
      </Typography.Title>

      <Tabs
        activeKey={tab}
        onChange={(k) => {
          setTab(k);
          setSelectedIds([]);
          if (k === "pending") setModFilter("");
          if (k === "all") setModFilter("");
        }}
        items={[
          {
            key: "pending",
            label: `Очередь (${pendingTotal})`,
            children: (
              <>
                {canEdit && (
                  <Space style={{ marginBottom: 16 }} wrap>
                    <Button
                      type="primary"
                      disabled={!selectedIds.length}
                      onClick={() => void bulk("approve")}
                    >
                      Одобрить выбранные
                    </Button>
                    <Button
                      danger
                      disabled={!selectedIds.length}
                      onClick={() => void bulk("reject")}
                    >
                      Отклонить
                    </Button>
                    <Button
                      disabled={!selectedIds.length}
                      onClick={() => void bulk("hide")}
                    >
                      Скрыть
                    </Button>
                  </Space>
                )}
                {reviewsTable}
              </>
            ),
          },
          {
            key: "all",
            label: "Все отзывы",
            children: (
              <>
                <Space style={{ marginBottom: 16 }} wrap>
                  <Input.Search
                    placeholder="Поиск"
                    allowClear
                    style={{ width: 220 }}
                    onSearch={setSearch}
                  />
                  <Select
                    allowClear
                    placeholder="Оценка"
                    style={{ width: 120 }}
                    options={[1, 2, 3, 4, 5].map((n) => ({
                      value: n,
                      label: `${n} ★`,
                    }))}
                    onChange={(v) => setRatingFilter(v)}
                  />
                  <Select
                    allowClear
                    placeholder="Статус"
                    style={{ width: 160 }}
                    value={modFilter || undefined}
                    options={Object.entries(MOD_STATUS).map(
                      ([value, { label }]) => ({
                        value,
                        label,
                      }),
                    )}
                    onChange={(v) => setModFilter(v ?? "")}
                  />
                </Space>
                {reviewsTable}
              </>
            ),
          },
          {
            key: "complaints",
            label: `Жалобы (${complaintsQuery.data?.pending_total ?? 0})`,
            children: (
              <>
                <Select
                  style={{ width: 200, marginBottom: 16 }}
                  value={complaintStatus}
                  onChange={setComplaintStatus}
                  options={[
                    { value: "pending", label: "Новые" },
                    { value: "reviewed", label: "Разобраны" },
                    { value: "dismissed", label: "Отклонены" },
                    { value: "", label: "Все" },
                  ]}
                />
                <Table
                  rowKey="id"
                  loading={complaintsQuery.isLoading}
                  dataSource={complaintsQuery.data?.items ?? []}
                  columns={complaintColumns}
                  pagination={false}
                  size="small"
                />
              </>
            ),
          },
        ]}
      />

      <Drawer
        title={drawerReview ? `Отзыв #${drawerReview.id}` : "Отзыв"}
        width={520}
        open={drawerId != null}
        onClose={() => {
          setDrawerId(null);
          setAdminNote("");
        }}
        extra={
          canEdit &&
          drawerReview && (
            <Space wrap>
              <Button
                type="primary"
                onClick={() => void moderate(drawerReview.id, "approve")}
              >
                Опубликовать
              </Button>
              <Button
                danger
                onClick={() => void moderate(drawerReview.id, "reject")}
              >
                Отклонить
              </Button>
              <Button onClick={() => void moderate(drawerReview.id, "hide")}>
                Скрыть
              </Button>
              {drawerReview.seller_reply && (
                <>
                  <Button
                    onClick={() =>
                      void moderate(drawerReview.id, "approve_reply")
                    }
                  >
                    Опубликовать ответ
                  </Button>
                  <Button
                    onClick={() => void moderate(drawerReview.id, "hide_reply")}
                  >
                    Скрыть ответ
                  </Button>
                </>
              )}
            </Space>
          )
        }
      >
        {drawerDetailQuery.isLoading && !drawerReview ? (
          <Typography.Text type="secondary">Загрузка…</Typography.Text>
        ) : (
          drawerReview && (
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <div>
                <Typography.Text type="secondary">Товар</Typography.Text>
                <br />
                <Link href={`/admin/products/${drawerReview.product_id}`}>
                  {drawerReview.product_name}
                </Link>
              </div>
              <Rate disabled value={drawerReview.rating} />
              {drawerReview.title && (
                <Typography.Title level={5} style={{ margin: 0 }}>
                  {drawerReview.title}
                </Typography.Title>
              )}
              {drawerReview.comment && (
                <Typography.Paragraph>
                  {drawerReview.comment}
                </Typography.Paragraph>
              )}
              {drawerReview.pros && (
                <Typography.Paragraph>
                  <strong>Плюсы:</strong> {drawerReview.pros}
                </Typography.Paragraph>
              )}
              {drawerReview.cons && (
                <Typography.Paragraph>
                  <strong>Минусы:</strong> {drawerReview.cons}
                </Typography.Paragraph>
              )}
              {drawerReview.photos && drawerReview.photos.length > 0 && (
                <Image.PreviewGroup>
                  <Space wrap>
                    {drawerReview.photos.map((p, i) => (
                      // eslint-disable-next-line jsx-a11y/alt-text
                      <Image
                        key={i}
                        src={p.url}
                        width={80}
                        height={80}
                        style={{ objectFit: "cover" }}
                      />
                    ))}
                  </Space>
                </Image.PreviewGroup>
              )}
              {drawerReview.seller_reply && (
                <Card size="small" title="Ответ продавца">
                  {drawerReview.seller_reply}
                </Card>
              )}
              {modTag(drawerReview.moderation_status)}
              {canEdit && (
                <Input.TextArea
                  rows={3}
                  placeholder="Заметка модератора"
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                />
              )}
            </Space>
          )
        )}
      </Drawer>

      <ModalComplaint
        open={complaintId != null}
        id={complaintId}
        note={complaintNote}
        hideReview={hideReviewOnComplaint}
        onNote={setComplaintNote}
        onHideReview={setHideReviewOnComplaint}
        onClose={() => {
          setComplaintId(null);
          setComplaintNote("");
        }}
        onSave={saveComplaint}
        canEdit={canEdit}
      />
    </div>
  );
}

function ModalComplaint({
  open,
  id,
  note,
  hideReview,
  onNote,
  onHideReview,
  onClose,
  onSave,
  canEdit,
}: {
  open: boolean;
  id: number | null;
  note: string;
  hideReview: boolean;
  onNote: (v: string) => void;
  onHideReview: (v: boolean) => void;
  onClose: () => void;
  onSave: (s: "reviewed" | "dismissed") => void;
  canEdit: boolean;
}) {
  if (!open) return null;
  return (
    <Drawer
      title={`Жалоба #${id ?? ""}`}
      open={open}
      onClose={onClose}
      extra={
        canEdit && (
          <Space>
            <Button type="primary" onClick={() => onSave("reviewed")}>
              Принять
            </Button>
            <Button onClick={() => onSave("dismissed")}>
              Отклонить жалобу
            </Button>
          </Space>
        )
      }
    >
      {canEdit && (
        <>
          <Input.TextArea
            rows={4}
            value={note}
            onChange={(e) => onNote(e.target.value)}
          />
          <div style={{ marginTop: 12 }}>
            <label>
              <input
                type="checkbox"
                checked={hideReview}
                onChange={(e) => onHideReview(e.target.checked)}
              />{" "}
              Скрыть отзыв при принятии жалобы
            </label>
          </div>
        </>
      )}
    </Drawer>
  );
}
