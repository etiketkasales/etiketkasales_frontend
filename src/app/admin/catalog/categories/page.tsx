"use client";

import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  App,
  Button,
  Card,
  Drawer,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Select,
  Space,
  Spin,
  Switch,
  Tag,
  Tree,
  Typography,
  Upload,
} from "antd";
import type { DataNode } from "antd/es/tree";
import type { UploadFile } from "antd/es/upload/interface";
import { PlusOutlined } from "@ant-design/icons";
import { useAdminPermission } from "~/src/refine/admin/useAdminPermission";
import {
  createAdminCategory,
  deleteAdminCategory,
  flattenCategoryTree,
  getAdminCategoriesTree,
  getAdminCategory,
  updateAdminCategory,
  uploadCategoryImage,
  type AdminCategory,
} from "~/src/features/admin/lib/adminCategories.api";
import { parseAxiosApiValidation } from "~/src/shared/lib/functions/shared.func";

type DrawerState =
  | { kind: "closed" }
  | { kind: "create"; parentId?: number | null }
  | { kind: "edit"; id: number };

function toTreeData(nodes: AdminCategory[]): DataNode[] {
  return nodes.map((n) => ({
    key: String(n.id),
    title: n.name,
    children: n.children?.length ? toTreeData(n.children) : undefined,
    data: n,
  }));
}

export default function AdminCategoriesPage() {
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [drawer, setDrawer] = useState<DrawerState>({ kind: "closed" });
  const [saving, setSaving] = useState(false);
  const [imageFileList, setImageFileList] = useState<UploadFile[]>([]);

  const canView = useAdminPermission("admin.catalog.categories.view");
  const canEdit = useAdminPermission("admin.catalog.categories.edit");

  const { data: tree = [], isLoading } = useQuery({
    queryKey: ["admin-categories-tree"],
    queryFn: getAdminCategoriesTree,
    enabled: canView,
  });

  const flatOptions = useMemo(
    () =>
      flattenCategoryTree(tree).map((c) => ({
        value: c.id,
        label: `${"— ".repeat(c.depth)}${c.name}`,
      })),
    [tree],
  );

  const treeData = useMemo(() => toTreeData(tree), [tree]);

  const openCreate = (parentId?: number | null) => {
    form.resetFields();
    form.setFieldsValue({
      parent_id: parentId ?? null,
      sort_order: 0,
      is_active: true,
    });
    setImageFileList([]);
    setDrawer({ kind: "create", parentId: parentId ?? null });
  };

  const openEdit = async (id: number) => {
    try {
      const cat = await getAdminCategory(id);
      form.setFieldsValue({
        name: cat.name,
        description: cat.description ?? "",
        parent_id: cat.parent_id,
        sort_order: cat.sort_order ?? 0,
        is_active: cat.is_active === 1 || cat.is_active === true,
        slug: cat.slug,
        attribute_schema_json: cat.attribute_schema
          ? JSON.stringify(cat.attribute_schema, null, 2)
          : "",
      });
      setImageFileList(
        cat.image
          ? [
              {
                uid: "img",
                name: "image",
                status: "done",
                url: cat.image,
              },
            ]
          : [],
      );
      setDrawer({ kind: "edit", id });
    } catch (e) {
      message.error(parseAxiosApiValidation(e).message || "Ошибка");
    }
  };

  const save = async () => {
    if (!canEdit) return;
    const values = await form.validateFields();
    const imageUrl =
      imageFileList.find((f) => f.status === "done")?.url ??
      (imageFileList[0]?.response as { url?: string } | undefined)?.url ??
      null;

    let attribute_schema: unknown = null;
    const schemaRaw = String(values.attribute_schema_json ?? "").trim();
    if (schemaRaw) {
      try {
        attribute_schema = JSON.parse(schemaRaw);
      } catch {
        message.error("Шаблон полей: невалидный JSON");
        return;
      }
    }

    const payload = {
      name: String(values.name).trim(),
      description: values.description?.trim() || null,
      parent_id: values.parent_id ?? null,
      sort_order: Number(values.sort_order ?? 0),
      is_active: Boolean(values.is_active),
      image: imageUrl,
      attribute_schema,
    };

    setSaving(true);
    try {
      if (drawer.kind === "create") {
        await createAdminCategory(payload);
        message.success("Категория создана");
      } else if (drawer.kind === "edit") {
        await updateAdminCategory(drawer.id, payload);
        message.success("Сохранено");
      }
      setDrawer({ kind: "closed" });
      await queryClient.invalidateQueries({
        queryKey: ["admin-categories-tree"],
      });
      await queryClient.invalidateQueries({ queryKey: ["categories-tree"] });
    } catch (e) {
      message.error(parseAxiosApiValidation(e).message || "Ошибка");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: number) => {
    if (!canEdit) return;
    try {
      await deleteAdminCategory(id);
      message.success("Удалено");
      await queryClient.invalidateQueries({
        queryKey: ["admin-categories-tree"],
      });
    } catch (e) {
      message.error(parseAxiosApiValidation(e).message || "Ошибка");
    }
  };

  if (!canView) {
    return (
      <Typography.Paragraph type="warning">
        Нет права admin.catalog.categories.view
      </Typography.Paragraph>
    );
  }

  return (
    <Space direction="vertical" size={16} style={{ width: "100%" }}>
      <Typography.Title level={4} style={{ marginTop: 0 }}>
        Категории каталога
      </Typography.Title>

      <Card>
        <Space style={{ marginBottom: 16 }}>
          {canEdit ? (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => openCreate(null)}
            >
              Корневая категория
            </Button>
          ) : null}
          <Typography.Text type="secondary">
            Дерево для витрины и карточек товаров
          </Typography.Text>
        </Space>

        <Spin spinning={isLoading}>
          <Tree
            showLine
            blockNode
            treeData={treeData}
            titleRender={(node) => {
              const cat = (node as DataNode & { data?: AdminCategory }).data;
              if (!cat) {
                return <span>{String(node.title)}</span>;
              }
              return (
                <Space wrap>
                  <span>{cat.name}</span>
                  <Tag color={cat.is_active ? "green" : "default"}>
                    {cat.is_active ? "активна" : "скрыта"}
                  </Tag>
                  <Typography.Text type="secondary">#{cat.id}</Typography.Text>
                  {canEdit ? (
                    <Space size={4}>
                      <Button
                        type="link"
                        size="small"
                        onClick={() => void openEdit(cat.id)}
                      >
                        Изменить
                      </Button>
                      <Button
                        type="link"
                        size="small"
                        onClick={() => openCreate(cat.id)}
                      >
                        + подкатегория
                      </Button>
                      <Popconfirm
                        title="Удалить категорию?"
                        description="Только если нет подкатегорий и товаров"
                        onConfirm={() => void remove(cat.id)}
                      >
                        <Button type="link" size="small" danger>
                          Удалить
                        </Button>
                      </Popconfirm>
                    </Space>
                  ) : null}
                </Space>
              );
            }}
          />
        </Spin>
      </Card>

      <Drawer
        width={480}
        open={drawer.kind !== "closed"}
        onClose={() => setDrawer({ kind: "closed" })}
        title={
          drawer.kind === "create"
            ? "Новая категория"
            : drawer.kind === "edit"
              ? `Категория #${drawer.id}`
              : ""
        }
        extra={
          canEdit ? (
            <Button type="primary" loading={saving} onClick={() => void save()}>
              Сохранить
            </Button>
          ) : null
        }
      >
        <Form form={form} layout="vertical" disabled={!canEdit}>
          <Form.Item
            name="name"
            label="Название"
            rules={[{ required: true, min: 2 }]}
          >
            <Input />
          </Form.Item>
          {drawer.kind === "edit" ? (
            <Form.Item name="slug" label="Slug">
              <Input disabled />
            </Form.Item>
          ) : null}
          <Form.Item name="description" label="Описание">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="parent_id" label="Родитель">
            <Select
              allowClear
              placeholder="Корневая"
              options={flatOptions.filter(
                (o) => drawer.kind !== "edit" || o.value !== drawer.id,
              )}
            />
          </Form.Item>
          <Form.Item name="sort_order" label="Порядок сортировки">
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="is_active"
            label="Активна на витрине"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item
            name="attribute_schema_json"
            label="Шаблон полей карточки (JSON)"
            extra='Пример: [{"key":"density","label":"Плотность","type":"text","required":false}]'
          >
            <Input.TextArea rows={6} placeholder="[]" />
          </Form.Item>
          <Form.Item label="Изображение">
            <Upload
              listType="picture-card"
              maxCount={1}
              fileList={imageFileList}
              onChange={({ fileList }) => setImageFileList(fileList)}
              customRequest={async ({ file, onSuccess, onError }) => {
                try {
                  const blob = file as File;
                  const url = await uploadCategoryImage(blob);
                  onSuccess?.({ url }, file);
                } catch (err) {
                  onError?.(err instanceof Error ? err : new Error("Ошибка"));
                }
              }}
            >
              {imageFileList.length < 1 ? "+ Загрузить" : null}
            </Upload>
          </Form.Item>
        </Form>
      </Drawer>
    </Space>
  );
}
