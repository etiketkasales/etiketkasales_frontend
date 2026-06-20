"use client";

import { useState } from "react";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { App, Button, Card, Space, Table, Typography, Upload } from "antd";
import {
  DownloadOutlined,
  InboxOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import { apiClient } from "~/src/shared/lib/api/client.api";
import { useAdminPermission } from "~/src/refine/admin/useAdminPermission";
import { parseAxiosApiValidation } from "~/src/shared/lib/functions/shared.func";

type ImportError = { row: number; message: string };

export default function AdminProductsImportPage() {
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const canEdit = useAdminPermission("admin.catalog.products.edit");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<{
    created: number;
    errors: ImportError[];
  } | null>(null);

  const downloadTemplate = async () => {
    try {
      const res = await apiClient.get("/admin/products/import-template", {
        responseType: "blob",
      });
      const blob = new Blob([res.data], { type: "text/csv;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "products_import_template.csv";
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      message.error(
        parseAxiosApiValidation(e).message || "Не удалось скачать шаблон",
      );
    }
  };

  const runImport = async () => {
    const file = fileList[0]?.originFileObj;
    if (!file) {
      message.warning("Выберите CSV-файл");
      return;
    }
    setUploading(true);
    setResult(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const { data } = await apiClient.post<{
        success: boolean;
        message?: string;
        data?: { created: number; errors: ImportError[] };
      }>("/admin/products/import-csv", fd);
      if (!data.success) {
        throw new Error(data.message ?? "Ошибка импорта");
      }
      setResult(data.data ?? { created: 0, errors: [] });
      message.success(data.message ?? "Импорт завершён");
      await queryClient.invalidateQueries({
        queryKey: ["default", "list", "products"],
      });
    } catch (e) {
      message.error(parseAxiosApiValidation(e).message || "Ошибка импорта");
    } finally {
      setUploading(false);
    }
  };

  if (!canEdit) {
    return (
      <Typography.Paragraph type="warning">
        Нет права admin.catalog.products.edit
      </Typography.Paragraph>
    );
  }

  return (
    <Space direction="vertical" size={16} style={{ width: "100%" }}>
      <Typography.Title level={4} style={{ marginTop: 0 }}>
        Импорт товаров из CSV
      </Typography.Title>
      <Typography.Paragraph type="secondary">
        До 500 строк за раз, разделитель «;» или «,». Обязательные колонки:{" "}
        <code>user_id</code>, <code>category_id</code>, <code>name</code>,{" "}
        <code>price</code>. Опционально: SKU, бренд (<code>brand_slug</code>),
        единица (<code>unit_short</code>), один вариант на строку.
      </Typography.Paragraph>

      <Space wrap>
        <Link href="/admin/products">
          <Button>К списку товаров</Button>
        </Link>
        <Button
          icon={<DownloadOutlined />}
          onClick={() => void downloadTemplate()}
        >
          Скачать шаблон CSV
        </Button>
      </Space>

      <Card>
        <Upload.Dragger
          accept=".csv,text/csv"
          maxCount={1}
          fileList={fileList}
          beforeUpload={() => false}
          onChange={({ fileList: fl }) => setFileList(fl.slice(-1))}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Перетащите CSV или нажмите для выбора
          </p>
        </Upload.Dragger>
        <Button
          type="primary"
          icon={<UploadOutlined />}
          loading={uploading}
          style={{ marginTop: 16 }}
          onClick={() => void runImport()}
        >
          Загрузить и создать товары
        </Button>
      </Card>

      {result ? (
        <Card title="Результат">
          <Typography.Paragraph>
            Создано товаров: <strong>{result.created}</strong>
          </Typography.Paragraph>
          {result.errors.length > 0 ? (
            <Table<ImportError>
              rowKey={(r) => `${r.row}-${r.message}`}
              size="small"
              pagination={{ pageSize: 20 }}
              dataSource={result.errors}
              columns={[
                { title: "Строка", dataIndex: "row", width: 80 },
                { title: "Ошибка", dataIndex: "message" },
              ]}
            />
          ) : (
            <Typography.Text type="success">Без ошибок</Typography.Text>
          )}
        </Card>
      ) : null}
    </Space>
  );
}
