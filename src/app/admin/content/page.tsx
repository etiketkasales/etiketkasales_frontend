"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  App,
  Button,
  Card,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
  Tabs,
  Tag,
  Typography,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Link from "next/link";
import { apiClient } from "~/src/shared/lib/api/client.api";
import { useAdminPermission } from "~/src/refine/admin/useAdminPermission";
import { parseAxiosApiValidation } from "~/src/shared/lib/functions/shared.func";

type StopWord = {
  id: number;
  phrase: string;
  type: string;
  is_active: number | boolean;
};

type Complaint = {
  id: number;
  product_id: number;
  product_name: string;
  seller_name?: string;
  reason: string;
  status: string;
  reporter_contact?: string;
  created_at: string;
};

export default function AdminContentPage() {
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const canView = useAdminPermission("admin.content.view");
  const canEdit = useAdminPermission("admin.content.edit");
  const [stopForm] = Form.useForm();
  const [stopOpen, setStopOpen] = useState(false);
  const [complaintStatus, setComplaintStatus] = useState<string>("pending");
  const [reviewId, setReviewId] = useState<number | null>(null);
  const [reviewNote, setReviewNote] = useState("");
  const [hideProduct, setHideProduct] = useState(false);

  const stopQuery = useQuery({
    queryKey: ["admin-stop-words"],
    queryFn: async () => {
      const res = await apiClient.get<{
        success: boolean;
        data?: { items: StopWord[] };
      }>("/admin/content/stop-words");
      return res.data.data?.items ?? [];
    },
    enabled: canView,
  });

  const complaintsQuery = useQuery({
    queryKey: ["admin-complaints", complaintStatus],
    queryFn: async () => {
      const res = await apiClient.get<{
        success: boolean;
        data?: {
          items: Complaint[];
          pending_total?: number;
        };
      }>("/admin/content/complaints", {
        params: {
          status: complaintStatus || undefined,
          limit: 50,
        },
      });
      return res.data.data ?? { items: [], pending_total: 0 };
    },
    enabled: canView,
  });

  const addStopWord = async () => {
    const v = await stopForm.validateFields();
    try {
      await apiClient.post("/admin/content/stop-words", v);
      message.success("Добавлено");
      setStopOpen(false);
      stopForm.resetFields();
      await queryClient.invalidateQueries({ queryKey: ["admin-stop-words"] });
    } catch (e) {
      message.error(parseAxiosApiValidation(e).message || "Ошибка");
    }
  };

  const removeStop = async (id: number) => {
    try {
      await apiClient.delete(`/admin/content/stop-words/${id}`);
      await queryClient.invalidateQueries({ queryKey: ["admin-stop-words"] });
    } catch (e) {
      message.error(parseAxiosApiValidation(e).message || "Ошибка");
    }
  };

  const saveComplaint = async (status: "reviewed" | "dismissed") => {
    if (!reviewId) return;
    try {
      await apiClient.patch(`/admin/content/complaints/${reviewId}`, {
        status,
        admin_note: reviewNote,
        hide_product: hideProduct,
      });
      message.success("Сохранено");
      setReviewId(null);
      setReviewNote("");
      setHideProduct(false);
      await queryClient.invalidateQueries({ queryKey: ["admin-complaints"] });
    } catch (e) {
      message.error(parseAxiosApiValidation(e).message || "Ошибка");
    }
  };

  if (!canView) {
    return (
      <Typography.Paragraph type="warning">
        Нет права admin.content.view
      </Typography.Paragraph>
    );
  }

  return (
    <Space direction="vertical" size={16} style={{ width: "100%" }}>
      <Typography.Title level={4} style={{ marginTop: 0 }}>
        Контент-модерация
      </Typography.Title>
      <Typography.Paragraph type="secondary">
        Стоп-слова проверяются при сохранении товара (название и описания).
        Изображения — мин. 100×100 px при загрузке. Скрытие товара — через
        жалобу или кнопку «Скрыть» в списке товаров.
      </Typography.Paragraph>

      <Tabs
        items={[
          {
            key: "complaints",
            label: `Жалобы (${complaintsQuery.data?.pending_total ?? 0} новых)`,
            children: (
              <Card>
                <Space style={{ marginBottom: 16 }}>
                  <Select
                    style={{ width: 180 }}
                    value={complaintStatus}
                    onChange={setComplaintStatus}
                    options={[
                      { value: "pending", label: "Новые" },
                      { value: "reviewed", label: "Разобраны" },
                      { value: "dismissed", label: "Отклонены" },
                      { value: "", label: "Все" },
                    ]}
                  />
                </Space>
                <Table<Complaint>
                  rowKey="id"
                  loading={complaintsQuery.isLoading}
                  dataSource={complaintsQuery.data?.items ?? []}
                  columns={[
                    { title: "ID", dataIndex: "id", width: 64 },
                    {
                      title: "Товар",
                      render: (_, r) => (
                        <Link href={`/admin/products?product=${r.product_id}`}>
                          #{r.product_id} {r.product_name}
                        </Link>
                      ),
                    },
                    { title: "Продавец", dataIndex: "seller_name" },
                    { title: "Жалоба", dataIndex: "reason", ellipsis: true },
                    {
                      title: "Статус",
                      dataIndex: "status",
                      render: (s) => (
                        <Tag color={s === "pending" ? "orange" : "default"}>
                          {s}
                        </Tag>
                      ),
                    },
                    {
                      title: "",
                      width: 120,
                      render: (_, r) =>
                        canEdit && r.status === "pending" ? (
                          <Button
                            size="small"
                            onClick={() => {
                              setReviewId(r.id);
                              setReviewNote("");
                              setHideProduct(true);
                            }}
                          >
                            Разобрать
                          </Button>
                        ) : null,
                    },
                  ]}
                />
              </Card>
            ),
          },
          {
            key: "stopwords",
            label: "Стоп-слова",
            children: (
              <Card>
                {canEdit ? (
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    style={{ marginBottom: 16 }}
                    onClick={() => setStopOpen(true)}
                  >
                    Добавить фразу
                  </Button>
                ) : null}
                <Table<StopWord>
                  rowKey="id"
                  loading={stopQuery.isLoading}
                  dataSource={stopQuery.data ?? []}
                  pagination={false}
                  columns={[
                    { title: "Фраза", dataIndex: "phrase" },
                    {
                      title: "Тип",
                      dataIndex: "type",
                      render: (t) => {
                        const labels: Record<string, string> = {
                          banned_word: "Стоп-слово",
                          forbidden_product: "Запрещённый товар",
                          spam: "Спам",
                        };
                        return labels[t] ?? t;
                      },
                    },
                    {
                      title: "",
                      width: 100,
                      render: (_, r) =>
                        canEdit ? (
                          <Popconfirm
                            title="Удалить?"
                            onConfirm={() => void removeStop(r.id)}
                          >
                            <Button type="link" size="small" danger>
                              Удалить
                            </Button>
                          </Popconfirm>
                        ) : null,
                    },
                  ]}
                />
              </Card>
            ),
          },
          {
            key: "help",
            label: "Справка",
            children: (
              <Card>
                <ul>
                  <li>
                    <strong>Варианты SKU</strong> — в карточке товара (список
                    «Товары» → строка → drawer), блок «Варианты (SKU /
                    штрихкод)» под ценой.
                  </li>
                  <li>
                    <strong>Импорт CSV</strong> — меню Каталог → «Импорт CSV»
                    или{" "}
                    <Link href="/admin/products/import">
                      /admin/products/import
                    </Link>
                  </li>
                  <li>
                    <strong>История полей</strong> — внизу формы товара при
                    редактировании.
                  </li>
                </ul>
              </Card>
            ),
          },
        ]}
      />

      <Modal
        title="Новая фраза"
        open={stopOpen}
        onCancel={() => setStopOpen(false)}
        onOk={() => void addStopWord()}
        destroyOnHidden
      >
        <Form
          form={stopForm}
          layout="vertical"
          initialValues={{ type: "banned_word" }}
        >
          <Form.Item name="phrase" label="Фраза" rules={[{ required: true }]}>
            <Input placeholder="слово или фраза" />
          </Form.Item>
          <Form.Item name="type" label="Тип">
            <Select
              options={[
                { value: "banned_word", label: "Стоп-слово" },
                { value: "forbidden_product", label: "Запрещённый товар" },
                { value: "spam", label: "Спам" },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={`Жалоба #${reviewId ?? ""}`}
        open={reviewId != null}
        onCancel={() => setReviewId(null)}
        footer={
          <Space>
            <Button onClick={() => void saveComplaint("dismissed")}>
              Отклонить жалобу
            </Button>
            <Button
              type="primary"
              onClick={() => void saveComplaint("reviewed")}
            >
              Разобрана{hideProduct ? " + скрыть товар" : ""}
            </Button>
          </Space>
        }
      >
        <Input.TextArea
          rows={3}
          value={reviewNote}
          onChange={(e) => setReviewNote(e.target.value)}
          placeholder="Комментарий админа"
        />
        <div style={{ marginTop: 12 }}>
          <label>
            <input
              type="checkbox"
              checked={hideProduct}
              onChange={(e) => setHideProduct(e.target.checked)}
            />{" "}
            Скрыть товар с витрины (is_active=0)
          </label>
        </div>
      </Modal>
    </Space>
  );
}
