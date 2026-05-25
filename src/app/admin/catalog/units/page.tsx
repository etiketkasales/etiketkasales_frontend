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

type UnitRow = {
  id: number;
  name: string;
  short_name: string;
  slug: string;
  is_active: number | boolean;
  sort_order: number;
};

export default function AdminUnitsPage() {
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  const canView = useAdminPermission("admin.catalog.units.view");
  const canEdit = useAdminPermission("admin.catalog.units.edit");

  const { data: items = [], isLoading } = useQuery({
    queryKey: ["admin-units"],
    queryFn: async () => {
      const res = await apiClient.get<{
        success: boolean;
        data?: { items: UnitRow[] };
      }>("/admin/units");
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

  const openEdit = (row: UnitRow) => {
    setEditId(row.id);
    form.setFieldsValue({
      name: row.name,
      short_name: row.short_name,
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
        short_name: String(values.short_name).trim(),
        is_active: Boolean(values.is_active),
        sort_order: Number(values.sort_order ?? 0),
      };
      if (editId) {
        await apiClient.put(`/admin/units/${editId}`, payload);
        message.success("Сохранено");
      } else {
        await apiClient.post("/admin/units", payload);
        message.success("Единица добавлена");
      }
      setOpen(false);
      await queryClient.invalidateQueries({ queryKey: ["admin-units"] });
      await queryClient.invalidateQueries({ queryKey: ["admin-units-select"] });
    } catch (e) {
      message.error(parseAxiosApiValidation(e).message || "Ошибка");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: number) => {
    if (!canEdit) return;
    try {
      await apiClient.delete(`/admin/units/${id}`);
      message.success("Удалено");
      await queryClient.invalidateQueries({ queryKey: ["admin-units"] });
      await queryClient.invalidateQueries({ queryKey: ["admin-units-select"] });
    } catch (e) {
      message.error(parseAxiosApiValidation(e).message || "Ошибка");
    }
  };

  if (!canView) {
    return (
      <Typography.Paragraph type="warning">
        Нет права admin.catalog.units.view
      </Typography.Paragraph>
    );
  }

  return (
    <Space direction="vertical" size={16} style={{ width: "100%" }}>
      <Typography.Title level={4} style={{ marginTop: 0 }}>
        Единицы измерения
      </Typography.Title>
      <Typography.Paragraph type="secondary">
        Краткое обозначение (шт, кг) показывается в карточке товара рядом с
        ценой.
      </Typography.Paragraph>

      <Card>
        {canEdit ? (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{ marginBottom: 16 }}
            onClick={openCreate}
          >
            Добавить единицу
          </Button>
        ) : null}

        <Table<UnitRow>
          rowKey="id"
          loading={isLoading}
          dataSource={items}
          pagination={false}
          columns={[
            { title: "ID", dataIndex: "id", width: 72 },
            { title: "Название", dataIndex: "name" },
            { title: "Обозначение", dataIndex: "short_name", width: 120 },
            { title: "Slug", dataIndex: "slug" },
            {
              title: "Статус",
              render: (_, r) => (
                <Tag color={r.is_active ? "green" : "default"}>
                  {r.is_active ? "активна" : "скрыта"}
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
                      title="Удалить единицу?"
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
        title={editId ? `Единица #${editId}` : "Новая единица"}
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
            <Input placeholder="Штука" />
          </Form.Item>
          <Form.Item
            name="short_name"
            label="Краткое обозначение"
            rules={[{ required: true, min: 1, max: 32 }]}
            extra="Отображается в карточке: «цена за шт»"
          >
            <Input placeholder="шт" style={{ width: 120 }} />
          </Form.Item>
          {editId ? (
            <Form.Item name="slug" label="Slug">
              <Input disabled />
            </Form.Item>
          ) : null}
          <Form.Item name="sort_order" label="Порядок">
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="is_active" label="Активна" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </Space>
  );
}
