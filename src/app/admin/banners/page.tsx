"use client";

import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  App,
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Select,
  Space,
  Switch,
  Table,
  Tag,
  Typography,
  Upload,
} from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import dayjs, { type Dayjs } from "dayjs";
import type { UploadFile } from "antd/es/upload/interface";
import { apiClient } from "~/src/shared/lib/api/client.api";
import { useAdminPermission } from "~/src/refine/admin/useAdminPermission";
import { parseAxiosApiValidation } from "~/src/shared/lib/functions/shared.func";

type Placement = "HOME_HERO" | "HOME_SMALL";
type ScheduleState = "scheduled" | "showing" | "finished";

type BannerRow = {
  id: number;
  name: string;
  placement: Placement;
  desktop_image: string;
  desktop_image_path: string;
  mobile_image: string | null;
  mobile_image_path: string | null;
  target_url: string | null;
  alt_text: string | null;
  is_active: boolean;
  start_at: string | null;
  end_at: string | null;
  sort_order: number;
  schedule_state: ScheduleState;
};

type BannerFormValues = {
  name: string;
  placement: Placement;
  desktop_image: string;
  mobile_image?: string | null;
  target_url?: string;
  alt_text?: string;
  is_active: boolean;
  start_at?: Dayjs | null;
  end_at?: Dayjs | null;
  sort_order: number;
};

const placementLabels: Record<Placement, string> = {
  HOME_HERO: "Большой (HOME_HERO)",
  HOME_SMALL: "Маленькие (HOME_SMALL)",
};

const scheduleLabels: Record<ScheduleState, { text: string; color: string }> = {
  scheduled: { text: "Запланирован", color: "blue" },
  showing: { text: "Показывается", color: "green" },
  finished: { text: "Завершён", color: "default" },
};

function pathFromUploadResponse(data: unknown): string | null {
  if (!data || typeof data !== "object") return null;
  const body = data as Record<string, unknown>;
  const node =
    body.data && typeof body.data === "object"
      ? (body.data as Record<string, unknown>)
      : body;
  const path = typeof node.path === "string" ? node.path.trim() : "";
  if (path) return path.startsWith("/") ? path : `/${path}`;
  const url = typeof node.url === "string" ? node.url.trim() : "";
  if (!url) return null;
  try {
    return new URL(url).pathname;
  } catch {
    return url.startsWith("/") ? url : null;
  }
}

export default function AdminBannersPage() {
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const [form] = Form.useForm<BannerFormValues>();
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [placementFilter, setPlacementFilter] = useState<Placement | "">("");
  const [activeFilter, setActiveFilter] = useState<"" | "1" | "0">("");
  const [scheduleFilter, setScheduleFilter] = useState<ScheduleState | "">("");
  const [desktopFileList, setDesktopFileList] = useState<UploadFile[]>([]);
  const [mobileFileList, setMobileFileList] = useState<UploadFile[]>([]);

  const canView = useAdminPermission("admin.marketing.view");
  const canEdit = useAdminPermission("admin.marketing.edit");

  const queryKey = useMemo(
    () => ["admin-banners", placementFilter, activeFilter, scheduleFilter],
    [placementFilter, activeFilter, scheduleFilter],
  );

  const { data: items = [], isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      const res = await apiClient.get<{
        success: boolean;
        data?: { items: BannerRow[] };
      }>("/admin/banners", {
        params: {
          placement: placementFilter || undefined,
          is_active: activeFilter === "" ? undefined : activeFilter,
          schedule_state: scheduleFilter || undefined,
        },
      });
      return res.data.data?.items ?? [];
    },
    enabled: canView,
  });

  const openCreate = () => {
    setEditId(null);
    form.resetFields();
    form.setFieldsValue({
      is_active: true,
      sort_order: 0,
      placement: "HOME_HERO",
      desktop_image: "",
      mobile_image: null,
    });
    setDesktopFileList([]);
    setMobileFileList([]);
    setOpen(true);
  };

  const openEdit = (row: BannerRow) => {
    setEditId(row.id);
    form.setFieldsValue({
      name: row.name,
      placement: row.placement,
      desktop_image: row.desktop_image_path,
      mobile_image: row.mobile_image_path,
      target_url: row.target_url ?? "",
      alt_text: row.alt_text ?? "",
      is_active: Boolean(row.is_active),
      start_at: row.start_at ? dayjs(row.start_at) : null,
      end_at: row.end_at ? dayjs(row.end_at) : null,
      sort_order: row.sort_order,
    });
    setDesktopFileList(
      row.desktop_image
        ? [
            {
              uid: "desktop",
              name: "desktop",
              status: "done",
              url: row.desktop_image,
            },
          ]
        : [],
    );
    setMobileFileList(
      row.mobile_image
        ? [
            {
              uid: "mobile",
              name: "mobile",
              status: "done",
              url: row.mobile_image,
            },
          ]
        : [],
    );
    setOpen(true);
  };

  const uploadBanner = async (file: File): Promise<string> => {
    const fd = new FormData();
    fd.append("image", file);
    const res = await apiClient.post("/upload/banner-image", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    const path = pathFromUploadResponse(res.data);
    if (!path) throw new Error("Сервер не вернул путь изображения");
    return path;
  };

  const save = async () => {
    if (!canEdit) return;
    const values = await form.validateFields();
    if (!values.desktop_image) {
      message.error("Загрузите изображение для десктопа");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        name: String(values.name).trim(),
        placement: values.placement,
        desktop_image: values.desktop_image,
        mobile_image: values.mobile_image || null,
        target_url: values.target_url?.trim() || null,
        alt_text: values.alt_text?.trim() || null,
        is_active: Boolean(values.is_active),
        start_at: values.start_at ? values.start_at.toISOString() : null,
        end_at: values.end_at ? values.end_at.toISOString() : null,
        sort_order: Number(values.sort_order ?? 0),
      };
      if (editId) {
        await apiClient.put(`/admin/banners/${editId}`, payload);
        message.success("Сохранено");
      } else {
        await apiClient.post("/admin/banners", payload);
        message.success("Баннер создан");
      }
      setOpen(false);
      await queryClient.invalidateQueries({ queryKey: ["admin-banners"] });
    } catch (e) {
      message.error(parseAxiosApiValidation(e).message || "Ошибка");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: number) => {
    if (!canEdit) return;
    try {
      await apiClient.delete(`/admin/banners/${id}`);
      message.success("Удалено");
      await queryClient.invalidateQueries({ queryKey: ["admin-banners"] });
    } catch (e) {
      message.error(parseAxiosApiValidation(e).message || "Ошибка");
    }
  };

  const toggleActive = async (row: BannerRow) => {
    if (!canEdit) return;
    try {
      await apiClient.put(`/admin/banners/${row.id}`, {
        is_active: !row.is_active,
      });
      await queryClient.invalidateQueries({ queryKey: ["admin-banners"] });
    } catch (e) {
      message.error(parseAxiosApiValidation(e).message || "Ошибка");
    }
  };

  if (!canView) {
    return (
      <Typography.Paragraph type="warning">
        Нет права admin.marketing.view
      </Typography.Paragraph>
    );
  }

  return (
    <Space direction="vertical" size={16} style={{ width: "100%" }}>
      <Typography.Title level={4} style={{ marginTop: 0 }}>
        Рекламные баннеры
      </Typography.Title>
      <Typography.Paragraph type="secondary">
        HOME_HERO — большой слайдер под шапкой. HOME_SMALL — маленькие баннеры
        под категориями. Даты хранятся в UTC.
      </Typography.Paragraph>

      <Card>
        <Space wrap style={{ marginBottom: 16 }}>
          {canEdit ? (
            <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>
              Новый баннер
            </Button>
          ) : null}
          <Select
            allowClear
            placeholder="Место"
            style={{ width: 220 }}
            value={placementFilter || undefined}
            onChange={(v) => setPlacementFilter((v as Placement) || "")}
            options={[
              { value: "HOME_HERO", label: placementLabels.HOME_HERO },
              { value: "HOME_SMALL", label: placementLabels.HOME_SMALL },
            ]}
          />
          <Select
            allowClear
            placeholder="Активность"
            style={{ width: 160 }}
            value={activeFilter || undefined}
            onChange={(v) => setActiveFilter((v as "" | "1" | "0") || "")}
            options={[
              { value: "1", label: "Включён" },
              { value: "0", label: "Выключен" },
            ]}
          />
          <Select
            allowClear
            placeholder="Состояние"
            style={{ width: 180 }}
            value={scheduleFilter || undefined}
            onChange={(v) => setScheduleFilter((v as ScheduleState) || "")}
            options={[
              { value: "scheduled", label: "Запланирован" },
              { value: "showing", label: "Показывается" },
              { value: "finished", label: "Завершён" },
            ]}
          />
        </Space>

        <Table<BannerRow>
          rowKey="id"
          loading={isLoading}
          dataSource={items}
          scroll={{ x: 1100 }}
          pagination={false}
          columns={[
            { title: "ID", dataIndex: "id", width: 64 },
            { title: "Название", dataIndex: "name", width: 180 },
            {
              title: "Место",
              dataIndex: "placement",
              width: 140,
              render: (p: Placement) => placementLabels[p] ?? p,
            },
            {
              title: "Превью",
              width: 100,
              render: (_, r) =>
                r.desktop_image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={r.desktop_image}
                    alt=""
                    style={{
                      width: 72,
                      height: 40,
                      objectFit: "cover",
                      borderRadius: 4,
                    }}
                  />
                ) : (
                  "—"
                ),
            },
            {
              title: "Вкл",
              width: 80,
              render: (_, r) => (
                <Switch
                  checked={Boolean(r.is_active)}
                  disabled={!canEdit}
                  onChange={() => void toggleActive(r)}
                />
              ),
            },
            {
              title: "Состояние",
              width: 130,
              render: (_, r) => {
                const s = scheduleLabels[r.schedule_state] ?? {
                  text: r.schedule_state,
                  color: "default",
                };
                return <Tag color={s.color}>{s.text}</Tag>;
              },
            },
            { title: "Порядок", dataIndex: "sort_order", width: 90 },
            {
              title: "Действия",
              width: 180,
              fixed: "right",
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
                      title="Удалить баннер?"
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
        title={editId ? `Баннер #${editId}` : "Новый баннер"}
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => void save()}
        okButtonProps={{ loading: saving, disabled: !canEdit }}
        width={640}
        destroyOnHidden
      >
        <Form form={form} layout="vertical" disabled={!canEdit}>
          <Form.Item
            name="name"
            label="Внутреннее название"
            rules={[{ required: true, min: 1, max: 255 }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="placement"
            label="Место размещения"
            rules={[{ required: true }]}
          >
            <Select
              options={[
                { value: "HOME_HERO", label: placementLabels.HOME_HERO },
                { value: "HOME_SMALL", label: placementLabels.HOME_SMALL },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="desktop_image"
            label="Изображение (десктоп)"
            rules={[{ required: true, message: "Обязательно" }]}
            hidden
          >
            <Input />
          </Form.Item>
          <Form.Item label="Изображение (десктоп)" required>
            <Upload
              listType="picture"
              maxCount={1}
              accept="image/jpeg,image/png,image/webp"
              fileList={desktopFileList}
              beforeUpload={(file) => {
                if (file.size / 1024 / 1024 > 5) {
                  message.error("Файл больше 5 МБ");
                  return Upload.LIST_IGNORE;
                }
                return true;
              }}
              customRequest={async (options) => {
                const { file, onSuccess, onError } = options;
                try {
                  const blob = file as File;
                  const path = await uploadBanner(blob);
                  form.setFieldsValue({ desktop_image: path });
                  setDesktopFileList([
                    {
                      uid: "desktop",
                      name: blob.name,
                      status: "done",
                      url: URL.createObjectURL(blob),
                    },
                  ]);
                  onSuccess?.(path);
                } catch (err) {
                  onError?.(err as Error);
                  message.error(
                    err instanceof Error ? err.message : "Ошибка загрузки",
                  );
                }
              }}
              onRemove={() => {
                form.setFieldsValue({ desktop_image: "" });
                setDesktopFileList([]);
              }}
            >
              <Button icon={<UploadOutlined />}>Загрузить</Button>
            </Upload>
          </Form.Item>

          <Form.Item name="mobile_image" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            label="Изображение (мобильное, опционально)"
            extra="Если не задано — на телефоне используется десктопное."
          >
            <Upload
              listType="picture"
              maxCount={1}
              accept="image/jpeg,image/png,image/webp"
              fileList={mobileFileList}
              beforeUpload={(file) => {
                if (file.size / 1024 / 1024 > 5) {
                  message.error("Файл больше 5 МБ");
                  return Upload.LIST_IGNORE;
                }
                return true;
              }}
              customRequest={async (options) => {
                const { file, onSuccess, onError } = options;
                try {
                  const blob = file as File;
                  const path = await uploadBanner(blob);
                  form.setFieldsValue({ mobile_image: path });
                  setMobileFileList([
                    {
                      uid: "mobile",
                      name: blob.name,
                      status: "done",
                      url: URL.createObjectURL(blob),
                    },
                  ]);
                  onSuccess?.(path);
                } catch (err) {
                  onError?.(err as Error);
                  message.error(
                    err instanceof Error ? err.message : "Ошибка загрузки",
                  );
                }
              }}
              onRemove={() => {
                form.setFieldsValue({ mobile_image: null });
                setMobileFileList([]);
              }}
            >
              <Button icon={<UploadOutlined />}>Загрузить</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            name="target_url"
            label="Ссылка"
            extra="Внутренний путь (/catalog/...) или https://..."
          >
            <Input placeholder="/seller/123" />
          </Form.Item>
          <Form.Item name="alt_text" label="Alt-текст">
            <Input />
          </Form.Item>
          <Space wrap>
            <Form.Item name="is_active" label="Включён" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item name="sort_order" label="Порядок">
              <InputNumber />
            </Form.Item>
          </Space>
          <Space wrap>
            <Form.Item name="start_at" label="Начало показа (UTC)">
              <DatePicker showTime />
            </Form.Item>
            <Form.Item name="end_at" label="Конец показа (UTC)">
              <DatePicker showTime />
            </Form.Item>
          </Space>
        </Form>
      </Modal>
    </Space>
  );
}
