"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  App,
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  Switch,
  TreeSelect,
  Typography,
  Upload,
} from "antd";
import type { DataNode } from "antd/es/tree";
import type { UploadFile } from "antd/es/upload/interface";
import { apiClient } from "~/src/shared/lib/api/client.api";
import { useAdminPermission } from "~/src/refine/admin/useAdminPermission";
import {
  approveProduct,
  rejectProduct,
} from "~/src/features/admin/lib/adminProductModeration";
import { getCategoriesTree } from "~/src/features/categories/lib/api/categories.api";
import type { ITreeCategory } from "~/src/features/categories/model";
import {
  getNewProductFilters,
  uploadProductDocument,
  uploadProductImage,
} from "~/src/entities/profile-section/lib/api";
import type { INewProductFilter } from "~/src/entities/profile-section/model";
import { parseAxiosApiValidation } from "~/src/shared/lib/functions/shared.func";
import type { IFileUploadRes } from "~/src/shared/model";

const STATUS_OPTIONS = [
  { value: "draft", label: "Черновик" },
  { value: "pending", label: "На модерации" },
  { value: "approved", label: "Одобрен" },
  { value: "rejected", label: "Отклонён" },
  { value: "archived", label: "В архиве" },
];

function categoriesToTreeData(nodes: ITreeCategory[]): DataNode[] {
  return nodes.map((n) => ({
    title: n.name,
    value: n.id,
    key: String(n.id),
    children: n.children?.length ? categoriesToTreeData(n.children) : undefined,
  }));
}

const CATALOG_FILTER_LABELS: Partial<Record<string, string>> = {
  type: "Тип",
  form: "Форма",
  material: "Материал",
  application_area: "Область применения",
  width_mm: "Ширина, мм",
  height_mm: "Высота, мм",
  print_technology: "Технология печати",
  manufacturer: "Производитель",
};

function productImageUrlsToFileList(urls: string[]): UploadFile[] {
  return urls.map((url, i) => ({
    uid: `existing-${i}-${url.slice(-32)}`,
    name: url.split("/").pop() || `image-${i + 1}`,
    status: "done",
    url,
    response: { url, upload_id: 0 } as IFileUploadRes,
  }));
}

function productDocumentsToFileList(
  docs: Array<Record<string, unknown>>,
): UploadFile[] {
  return docs.map((d, i) => {
    const url = typeof d.url === "string" ? d.url : "";
    const name =
      typeof d.original_name === "string" && d.original_name.trim()
        ? d.original_name
        : url.split("/").pop() || `document-${i + 1}.pdf`;
    const uploadId =
      typeof d.upload_id === "number" && d.upload_id > 0
        ? d.upload_id
        : typeof d.upload_id === "string" && /^\d+$/.test(d.upload_id)
          ? parseInt(d.upload_id, 10)
          : 0;
    return {
      uid: `doc-${i}-${url.slice(-24)}`,
      name,
      status: "done" as const,
      url: url || undefined,
      response: { url, upload_id: uploadId } as IFileUploadRes,
    };
  });
}

type FormChrome = {
  /** В Drawer списка товаров: без перехода на отдельные страницы */
  embedded?: boolean;
  onClose?: () => void;
  /** После создания в embedded: переключить форму на редактирование того же id */
  onCreated?: (id: number) => void;
  onAfterSave?: () => void;
};

export type AdminProductFormProps =
  | ({ mode: "create" } & FormChrome)
  | ({ mode: "edit"; productId: number } & FormChrome);

export function AdminProductForm(props: AdminProductFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const productImagesWatch = Form.useWatch("productImages", form) as
    | UploadFile[]
    | undefined;
  const documentAttachmentsWatch = Form.useWatch(
    "documentAttachments",
    form,
  ) as UploadFile[] | undefined;
  const videoUrlRowsWatch = Form.useWatch("videoUrlRows", form) as
    | Array<{ url?: string }>
    | undefined;
  const statusWatch = Form.useWatch("status", form) as string | undefined;

  const canEdit = useAdminPermission("admin.catalog.products.edit");
  const canModerate = useAdminPermission("admin.moderation.edit");
  const [moderating, setModerating] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const treeQuery = useQuery({
    queryKey: ["categories-tree"],
    queryFn: async () => {
      const rows = await getCategoriesTree();
      return rows ?? [];
    },
  });

  const treeData = useMemo(
    () => categoriesToTreeData(treeQuery.data ?? []),
    [treeQuery.data],
  );

  const filtersQuery = useQuery({
    queryKey: ["product-create-filters"],
    queryFn: getNewProductFilters,
    staleTime: 5 * 60 * 1000,
  });

  const renderCatalogFilterField = (f: INewProductFilter) => {
    const nameStr = String(f.field);
    const label = CATALOG_FILTER_LABELS[nameStr] ?? nameStr;
    const opts = (f.options ?? [])
      .filter((o): o is string => o.trim() !== "")
      .map((o) => ({ value: o, label: o }));

    if (f.type === "numeric") {
      return (
        <Form.Item key={nameStr} name={f.field} label={label}>
          <InputNumber
            min={0}
            style={{ width: 160 }}
            placeholder={f.placeholder}
          />
        </Form.Item>
      );
    }
    if (f.type === "select" && opts.length > 0) {
      return (
        <Form.Item key={nameStr} name={f.field} label={label}>
          <Select
            allowClear
            showSearch
            optionFilterProp="label"
            options={opts}
            placeholder={f.placeholder}
            style={{ minWidth: 220 }}
          />
        </Form.Item>
      );
    }
    if (f.type === "text" && opts.length > 0) {
      return (
        <Form.Item key={nameStr} name={f.field} label={label}>
          <Select
            allowClear
            showSearch
            optionFilterProp="label"
            options={opts}
            placeholder={f.placeholder}
            style={{ minWidth: 220 }}
          />
        </Form.Item>
      );
    }
    return (
      <Form.Item key={nameStr} name={f.field} label={label}>
        <Input placeholder={f.placeholder} />
      </Form.Item>
    );
  };

  const productId = props.mode === "edit" ? props.productId : 0;

  const productQuery = useQuery({
    queryKey: ["admin-product", productId],
    queryFn: async () => {
      const { data } = await apiClient.get<{
        success: boolean;
        data?: { product: Record<string, unknown> };
        message?: string;
      }>(`/admin/products/${productId}`);
      if (!data.success || !data.data?.product) {
        throw new Error(data.message ?? "Не удалось загрузить товар");
      }
      return data.data.product;
    },
    enabled: props.mode === "edit" && productId > 0,
  });

  useEffect(() => {
    if (props.mode !== "edit" || !productQuery.data) {
      return;
    }
    const p = productQuery.data;
    const images = Array.isArray(p.images) ? (p.images as string[]) : [];
    const spec = p.specifications;
    const specPairs =
      spec && typeof spec === "object" && !Array.isArray(spec)
        ? Object.entries(spec as Record<string, unknown>).map(([key, val]) => ({
            key,
            value: val == null ? "" : String(val),
          }))
        : [];
    const mediaRaw = p.media;
    let videoUrlRows: Array<{ url: string }> = [];
    let documentAttachments: UploadFile[] = [];
    if (mediaRaw && typeof mediaRaw === "object" && !Array.isArray(mediaRaw)) {
      const m = mediaRaw as Record<string, unknown>;
      const vids = Array.isArray(m.videos) ? m.videos : [];
      videoUrlRows = vids
        .filter((x): x is string => typeof x === "string" && x.trim() !== "")
        .map((url) => ({ url }));
      const docList = Array.isArray(m.documents) ? m.documents : [];
      const docRecords = docList.filter(
        (x): x is Record<string, unknown> =>
          x !== null && typeof x === "object" && !Array.isArray(x),
      );
      documentAttachments = productDocumentsToFileList(docRecords);
    }
    form.setFieldsValue({
      user_id: p.user_id,
      category_id: p.category_id,
      name: p.name,
      slug: p.slug,
      short_description: p.short_description,
      description: p.description,
      price: p.price,
      old_price: p.old_price,
      sku: p.sku,
      stock_quantity: p.stock_quantity,
      min_order_quantity: p.min_order_quantity,
      weight: p.weight,
      dimensions: p.dimensions,
      material: p.material,
      color: p.color,
      size: p.size,
      type: p.type,
      form: p.form,
      application_area: p.application_area,
      print_technology: p.print_technology,
      manufacturer: p.manufacturer,
      width_mm: p.width_mm,
      height_mm: p.height_mm,
      productImages: productImageUrlsToFileList(images),
      videoUrlRows,
      documentAttachments,
      specPairs,
      status: p.status,
      is_active: Boolean(
        p.is_active === 1 || p.is_active === true || p.is_active === "1",
      ),
      is_featured: Boolean(
        p.is_featured === 1 || p.is_featured === true || p.is_featured === "1",
      ),
    });
  }, [form, productQuery.data, props.mode]);

  const [saving, setSaving] = useState(false);

  const onFinish = async (values: Record<string, unknown>) => {
    if (!canEdit) {
      message.error("Нет права admin.catalog.products.edit");
      return;
    }
    if (props.mode === "edit" && !String(values.slug ?? "").trim()) {
      message.error("Заполните slug (URL)");
      return;
    }
    const files = (values.productImages ?? []) as UploadFile[];
    const imageUrls = files
      .filter((f) => f.status === "done")
      .map((f) => {
        const r = f.response as IFileUploadRes | undefined;
        const fromResp = r?.url?.trim();
        const fromUrl = typeof f.url === "string" ? f.url.trim() : "";
        return fromResp || fromUrl;
      })
      .filter(Boolean);

    const specRows = (values.specPairs ?? []) as Array<{
      key?: string;
      value?: string;
    }>;
    const specifications: Record<string, string> = {};
    for (const row of specRows) {
      const k = String(row?.key ?? "").trim();
      if (!k) continue;
      specifications[k] = String(row?.value ?? "").trim();
    }

    const videoRows = (values.videoUrlRows ?? []) as Array<{ url?: string }>;
    const videoUrls = videoRows
      .map((r) => String(r?.url ?? "").trim())
      .filter(Boolean)
      .slice(0, 10);

    const docFiles = (values.documentAttachments ?? []) as UploadFile[];
    const documents = docFiles
      .filter((f) => f.status === "done")
      .map((f) => {
        const r = f.response as IFileUploadRes | undefined;
        const url = (r?.url ?? (typeof f.url === "string" ? f.url : "")).trim();
        return {
          url,
          original_name: f.name || undefined,
          upload_id: r?.upload_id && r.upload_id > 0 ? r.upload_id : undefined,
        };
      })
      .filter((d) => d.url);

    const payload: Record<string, unknown> = {
      name: values.name,
      slug: values.slug,
      short_description: values.short_description || null,
      description: values.description || null,
      category_id: values.category_id,
      price: values.price,
      old_price: values.old_price ?? null,
      sku: values.sku || null,
      stock_quantity: values.stock_quantity ?? 0,
      min_order_quantity: values.min_order_quantity ?? 1,
      weight: values.weight ?? null,
      dimensions: values.dimensions || null,
      material: values.material || null,
      color: values.color || null,
      size: values.size || null,
      type: values.type || null,
      form: values.form || null,
      application_area: values.application_area || null,
      print_technology: values.print_technology || null,
      manufacturer: values.manufacturer || null,
      width_mm: values.width_mm ?? null,
      height_mm: values.height_mm ?? null,
      images: imageUrls,
      media: { videos: videoUrls, documents },
      specifications,
      status: values.status,
      is_active: values.is_active ? 1 : 0,
      is_featured: values.is_featured ? 1 : 0,
    };

    if (props.mode === "create") {
      const userId = values.user_id;
      if (!userId) {
        message.error("Укажите ID продавца (user_id)");
        return;
      }
      payload.user_id = userId;
    }

    setSaving(true);
    try {
      if (props.mode === "create") {
        const { data } = await apiClient.post<{
          success: boolean;
          data?: { id: number };
          message?: string;
        }>("/admin/products", payload);
        if (!data.success) {
          throw new Error(data.message ?? "Ошибка создания");
        }
        const newId = data.data?.id;
        message.success("Товар создан");
        if (newId) {
          await queryClient.invalidateQueries({
            queryKey: ["default", "list", "products"],
          });
          if (props.onCreated) {
            props.onCreated(newId);
          } else if (!props.embedded) {
            router.push(`/admin/products/${newId}`);
          }
          props.onAfterSave?.();
        }
        return;
      }

      const { data } = await apiClient.put<{
        success: boolean;
        message?: string;
      }>(`/admin/products/${productId}`, payload);
      if (!data.success) {
        throw new Error(data.message ?? "Ошибка сохранения");
      }
      message.success("Сохранено");
      await queryClient.invalidateQueries({
        queryKey: ["admin-product", productId],
      });
      await queryClient.invalidateQueries({
        queryKey: ["default", "list", "products"],
      });
      props.onAfterSave?.();
    } catch (e: unknown) {
      const m = parseAxiosApiValidation(e).message;
      message.error(m || (e instanceof Error ? e.message : "Ошибка"));
    } finally {
      setSaving(false);
    }
  };

  if (props.mode === "edit" && productQuery.isError) {
    return (
      <Card>
        <Typography.Text type="danger">
          {(productQuery.error as Error)?.message ?? "Ошибка загрузки"}
        </Typography.Text>
      </Card>
    );
  }

  return (
    <Space direction="vertical" size={16} style={{ width: "100%" }}>
      <Space wrap>
        {props.embedded ? (
          <Button onClick={() => props.onClose?.()}>Закрыть</Button>
        ) : (
          <Button onClick={() => router.push("/admin/products")}>
            К списку
          </Button>
        )}
        {props.mode === "edit" && productQuery.data && (
          <Typography.Text type="secondary">
            Витрина:{" "}
            <strong>{(productQuery.data.visibility as string) ?? "—"}</strong> ·
            status: {String(productQuery.data.status ?? "—")}
          </Typography.Text>
        )}
      </Space>

      <Card
        loading={props.mode === "edit" && productQuery.isLoading}
        title={props.mode === "create" ? "Новый товар" : `Товар #${productId}`}
      >
        <Form
          form={form}
          layout="vertical"
          disabled={!canEdit}
          onFinish={onFinish}
          initialValues={
            props.mode === "create"
              ? {
                  status: "draft",
                  is_active: true,
                  stock_quantity: 0,
                  min_order_quantity: 1,
                  productImages: [],
                  videoUrlRows: [],
                  documentAttachments: [],
                  specPairs: [],
                }
              : undefined
          }
        >
          {props.mode === "create" && (
            <Form.Item
              name="user_id"
              label="ID продавца (users.id, role=seller)"
              rules={[{ required: true, message: "Обязательно" }]}
            >
              <InputNumber
                min={1}
                style={{ width: 200 }}
                placeholder="Напр. 42"
              />
            </Form.Item>
          )}

          <Form.Item
            name="category_id"
            label="Категория"
            rules={[{ required: true, message: "Выберите категорию" }]}
          >
            <TreeSelect
              showSearch
              treeDefaultExpandAll
              allowClear={false}
              style={{ minWidth: 280 }}
              treeData={treeData}
              loading={treeQuery.isLoading}
              placeholder="Категория"
              filterTreeNode={(input, node) =>
                String(node?.title ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            />
          </Form.Item>

          <Form.Item
            name="name"
            label="Название"
            rules={[{ required: true, message: "Обязательно" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="slug" label="Slug (URL)">
            <Input placeholder="Оставьте пустым — сгенерируется при создании" />
          </Form.Item>
          <Form.Item name="short_description" label="Краткое описание">
            <Input.TextArea rows={2} />
          </Form.Item>
          <Form.Item name="description" label="Описание">
            <Input.TextArea rows={5} />
          </Form.Item>

          <Space wrap>
            <Form.Item
              name="price"
              label="Цена"
              rules={[{ required: true, message: "Цена" }]}
            >
              <InputNumber min={0} step={0.01} />
            </Form.Item>
            <Form.Item name="old_price" label="Старая цена">
              <InputNumber min={0} step={0.01} />
            </Form.Item>
            <Form.Item name="sku" label="SKU">
              <Input style={{ width: 200 }} />
            </Form.Item>
          </Space>

          <Space wrap>
            <Form.Item name="stock_quantity" label="Остаток">
              <InputNumber min={0} />
            </Form.Item>
            <Form.Item name="min_order_quantity" label="Мин. заказ (шт.)">
              <InputNumber min={1} />
            </Form.Item>
          </Space>

          <Typography.Title level={5}>Параметры каталога</Typography.Title>
          {filtersQuery.isError ? (
            <Typography.Text type="danger">
              Не удалось загрузить списки значений (тип, форма и т.д.). Обновите
              страницу.
            </Typography.Text>
          ) : null}
          <Space wrap style={{ width: "100%" }}>
            {(filtersQuery.data ?? []).map(renderCatalogFilterField)}
          </Space>

          <Space wrap>
            <Form.Item name="color" label="Цвет">
              <Input style={{ width: 200 }} />
            </Form.Item>
            <Form.Item name="size" label="Размер">
              <Input style={{ width: 200 }} />
            </Form.Item>
            <Form.Item name="weight" label="Вес">
              <InputNumber min={0} step={0.01} />
            </Form.Item>
            <Form.Item name="dimensions" label="Габариты (строка)">
              <Input style={{ width: 200 }} />
            </Form.Item>
          </Space>

          <Typography.Title level={5}>Изображения</Typography.Title>
          <Form.Item
            name="productImages"
            label="Файлы"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
            extra="До 5 файлов, до 5 МБ (JPEG, PNG, WebP)."
          >
            <Upload
              listType="picture-card"
              multiple
              maxCount={5}
              accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
              beforeUpload={(file) => {
                const okSize = file.size / 1024 / 1024 < 5;
                if (!okSize) {
                  message.error("Файл больше 5 МБ");
                  return Upload.LIST_IGNORE;
                }
                return true;
              }}
              customRequest={async (options) => {
                const { file, onSuccess, onError } = options;
                const uf = file as UploadFile;
                const blob = uf.originFileObj;
                if (!blob) {
                  onError?.(new Error("Нет файла"));
                  return;
                }
                try {
                  const fd = new FormData();
                  fd.append("image", blob);
                  const res = await uploadProductImage(fd);
                  onSuccess?.(res, file);
                } catch (err: unknown) {
                  const m =
                    err instanceof Error ? err.message : "Ошибка загрузки";
                  message.error(m);
                  onError?.(err instanceof Error ? err : new Error(m));
                }
              }}
            >
              {(productImagesWatch?.length ?? 0) < 5 ? (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Загрузить</div>
                </div>
              ) : null}
            </Upload>
          </Form.Item>

          <Typography.Title level={5}>Видео</Typography.Title>
          <Typography.Paragraph type="secondary" style={{ marginTop: 0 }}>
            Ссылки на ролик (YouTube, Rutube и т.д.), до 10 строк.
          </Typography.Paragraph>
          <Form.List name="videoUrlRows">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...rest }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...rest}
                      name={[name, "url"]}
                      style={{ flex: 1 }}
                    >
                      <Input placeholder="https://..." />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                    disabled={(videoUrlRowsWatch?.length ?? 0) >= 10}
                  >
                    Добавить ссылку
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Typography.Title level={5}>Документы</Typography.Title>
          <Typography.Paragraph type="secondary" style={{ marginTop: 0 }}>
            Только PDF, до 5 файлов, до 10 МБ каждый.
          </Typography.Paragraph>
          <Form.Item
            name="documentAttachments"
            label="PDF"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          >
            <Upload
              multiple
              maxCount={5}
              accept="application/pdf,.pdf"
              beforeUpload={(file) => {
                const okSize = file.size / 1024 / 1024 < 10;
                if (!okSize) {
                  message.error("Файл больше 10 МБ");
                  return Upload.LIST_IGNORE;
                }
                return true;
              }}
              customRequest={async (options) => {
                const { file, onSuccess, onError } = options;
                const uf = file as UploadFile;
                const blob = uf.originFileObj;
                if (!blob) {
                  onError?.(new Error("Нет файла"));
                  return;
                }
                try {
                  const fd = new FormData();
                  fd.append("document", blob);
                  const res = await uploadProductDocument(fd);
                  onSuccess?.(res, file);
                } catch (err: unknown) {
                  const m =
                    err instanceof Error ? err.message : "Ошибка загрузки";
                  message.error(m);
                  onError?.(err instanceof Error ? err : new Error(m));
                }
              }}
            >
              {(documentAttachmentsWatch?.length ?? 0) < 5 ? (
                <Button icon={<PlusOutlined />}>Загрузить PDF</Button>
              ) : null}
            </Upload>
          </Form.Item>

          <Typography.Title level={5}>
            Дополнительные характеристики
          </Typography.Title>
          <Typography.Paragraph type="secondary" style={{ marginTop: 0 }}>
            Пары «название — значение» (например: плотность — 80 г/м²).
          </Typography.Paragraph>
          <Form.List name="specPairs">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...rest }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item {...rest} name={[name, "key"]}>
                      <Input placeholder="Название" style={{ width: 200 }} />
                    </Form.Item>
                    <Form.Item {...rest} name={[name, "value"]}>
                      <Input placeholder="Значение" style={{ width: 280 }} />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Добавить строку
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Typography.Title level={5}>Модерация и витрина</Typography.Title>
          <Form.Item name="status" label="Статус модерации">
            <Select options={STATUS_OPTIONS} style={{ width: 240 }} />
          </Form.Item>
          <Space align="start">
            <Form.Item
              name="is_active"
              label="Активен на витрине"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            <Typography.Paragraph type="secondary" style={{ marginTop: 0 }}>
              Для покупателей товар виден при статусе «Одобрен» и включённом
              переключателе.
            </Typography.Paragraph>
          </Space>
          <Form.Item
            name="is_featured"
            label="Избранный"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          {props.mode === "edit" && canModerate && statusWatch === "pending" ? (
            <Space wrap style={{ marginBottom: 12 }}>
              <Button
                type="primary"
                loading={moderating}
                onClick={() => {
                  void (async () => {
                    setModerating(true);
                    try {
                      await approveProduct(productId);
                      message.success("Товар одобрен");
                      await productQuery.refetch();
                      props.onAfterSave?.();
                    } catch (e) {
                      message.error(
                        parseAxiosApiValidation(e).message || "Ошибка",
                      );
                    } finally {
                      setModerating(false);
                    }
                  })();
                }}
              >
                Одобрить без сохранения формы
              </Button>
              <Button danger onClick={() => setRejectOpen(true)}>
                Отклонить…
              </Button>
            </Space>
          ) : null}

          {canEdit ? (
            <Button type="primary" htmlType="submit" loading={saving}>
              Сохранить
            </Button>
          ) : (
            <Typography.Text type="warning">
              Только просмотр — нет права admin.catalog.products.edit
            </Typography.Text>
          )}
        </Form>
      </Card>

      <Modal
        title="Причина отклонения"
        open={rejectOpen}
        onCancel={() => setRejectOpen(false)}
        onOk={() => {
          const reason = rejectReason.trim();
          if (!reason) {
            message.error("Укажите причину");
            return;
          }
          void (async () => {
            setModerating(true);
            try {
              await rejectProduct(productId, reason);
              message.success("Отклонено");
              setRejectOpen(false);
              setRejectReason("");
              await productQuery.refetch();
              props.onAfterSave?.();
            } catch (e) {
              message.error(parseAxiosApiValidation(e).message || "Ошибка");
            } finally {
              setModerating(false);
            }
          })();
        }}
        okButtonProps={{ loading: moderating }}
      >
        <Input.TextArea
          rows={4}
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
        />
      </Modal>
    </Space>
  );
}
