"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  App,
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Space,
  Switch,
  Table,
  Tag,
  Typography,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { apiClient } from "~/src/shared/lib/api/client.api";
import { useAdminPermission } from "~/src/refine/admin/useAdminPermission";
import { parseAxiosApiValidation } from "~/src/shared/lib/functions/shared.func";

type BrandRow = {
  id: number;
  name: string;
  slug: string;
  is_active: number | boolean;
  sort_order: number;
};

export default function AdminBrandsPage() {
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  const canView = useAdminPermission("admin.catalog.brands.view");
  const canEdit = useAdminPermission("admin.catalog.brands.edit");

  const { data: items = [], isLoading } = useQuery({
    queryKey: ["admin-brands"],
    queryFn: async () => {
      const res = await apiClient.get<{
        success: boolean;
        data?: { items: BrandRow[] };
      }>("/admin/brands");
      return res.data.data?.items ?? [];
    },
    enabled: canView,
  });

  const openCreate = () => {
    setEditId(null);
    form.resetFields();
    form.setFieldsValue({ is_active: true, sort_order: 0 });
    setOpen(true);
  };

  const openEdit = (row: BrandRow) => {
    setEditId(row.id);
    form.setFieldsValue({
      name: row.name,
      slug: row.slug,
      is_active: row.is_active === 1 || row.is_active === true,
      sort_order: row.sort_order,
    });
    setOpen(true);
  };

  const save = async () => {
    if (!canEdit) return;
    const values = await form.validateFields();
    setSaving(true);
    try {
      const payload = {
        name: String(values.name).trim(),
        is_active: Boolean(values.is_active),
        sort_order: Number(values.sort_order ?? 0),
      };
      if (editId) {
        await apiClient.put(`/admin/brands/${editId}`, payload);
        message.success("Сохранено");
      } else {
        await apiClient.post("/admin/brands", payload);
        message.success("Бренд создан");
      }
      setOpen(false);
      await queryClient.invalidateQueries({ queryKey: ["admin-brands"] });
    } catch (e) {
      message.error(parseAxiosApiValidation(e).message || "Ошибка");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: number) => {
    if (!canEdit) return;
    try {
      await apiClient.delete(`/admin/brands/${id}`);
      message.success("Удалено");
      await queryClient.invalidateQueries({ queryKey: ["admin-brands"] });
    } catch (e) {
      message.error(parseAxiosApiValidation(e).message || "Ошибка");
    }
  };

  if (!canView) {
    return (
      <Typography.Paragraph type="warning">
        Нет права admin.catalog.brands.view
      </Typography.Paragraph>
    );
  }

  return (
    <Space direction="vertical" size={16} style={{ width: "100%" }}>
      <Typography.Title level={4} style={{ marginTop: 0 }}>
        Справочник брендов
      </Typography.Title>
      <Typography.Paragraph type="secondary">
        Используется в поле «Производитель» карточки товара. Пока связь по
        точному совпадению названия.
      </Typography.Paragraph>

      <Card>
        {canEdit ? (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{ marginBottom: 16 }}
            onClick={openCreate}
          >
            Добавить бренд
          </Button>
        ) : null}

        <Table<BrandRow>
          rowKey="id"
          loading={isLoading}
          dataSource={items}
          pagination={false}
          columns={[
            { title: "ID", dataIndex: "id", width: 72 },
            { title: "Название", dataIndex: "name" },
            { title: "Slug", dataIndex: "slug" },
            {
              title: "Статус",
              render: (_, r) => (
                <Tag color={r.is_active ? "green" : "default"}>
                  {r.is_active ? "активен" : "скрыт"}
                </Tag>
              ),
            },
            { title: "Порядок", dataIndex: "sort_order", width: 90 },
            {
              title: "Действия",
              width: 200,
              render: (_, row) =>
                canEdit ? (
                  <Space>
                    <Button
                      type="link"
                      size="small"
                      onClick={() => openEdit(row)}
                    >
                      Изменить
                    </Button>
                    <Popconfirm
                      title="Удалить бренд?"
                      onConfirm={() => void remove(row.id)}
                    >
                      <Button type="link" size="small" danger>
                        Удалить
                      </Button>
                    </Popconfirm>
                  </Space>
                ) : null,
            },
          ]}
        />
      </Card>

      <Modal
        title={editId ? `Бренд #${editId}` : "Новый бренд"}
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => void save()}
        okButtonProps={{ loading: saving }}
        destroyOnHidden
      >
        <Form form={form} layout="vertical" disabled={!canEdit}>
          <Form.Item
            name="name"
            label="Название"
            rules={[{ required: true, min: 2 }]}
          >
            <Input />
          </Form.Item>
          {editId ? (
            <Form.Item name="slug" label="Slug">
              <Input disabled />
            </Form.Item>
          ) : null}
          <Form.Item name="sort_order" label="Порядок">
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="is_active" label="Активен" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </Space>
  );
}
