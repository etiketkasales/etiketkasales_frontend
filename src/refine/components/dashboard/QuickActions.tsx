"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  Button,
  Card,
  Col,
  Input,
  Row,
  Select,
  Space,
  Typography,
  message,
} from "antd";
import { apiClient } from "~/src/shared/lib/api/client.api";
import {
  adminBlockUser,
  adminUpdateOrderStatus,
} from "~/src/refine/api/admin-api";
import type { AdminDashboardData } from "~/src/refine/api/dashboard.types";

const ORDER_STATUSES = [
  "pending_payment",
  "paid",
  "accepted",
  "shipped",
  "in_transit",
  "delivered",
  "cancelled",
  "refunded",
];

type UserOpt = { id: number; name: string | null; phone: string | null };
type OrderOpt = { id: number; order_number: string };

export function QuickActions({ meta }: { meta: AdminDashboardData["meta"] }) {
  const [userId, setUserId] = useState<number | null>(null);
  const [reason, setReason] = useState("");
  const [orderId, setOrderId] = useState<number | null>(null);
  const [status, setStatus] = useState("delivered");
  const [loadingUser, setLoadingUser] = useState(false);
  const [loadingOrder, setLoadingOrder] = useState(false);

  const { data: usersList = [] } = useQuery({
    queryKey: ["admin", "quick", "users"],
    queryFn: async () => {
      const { data } = await apiClient.get<{
        success?: boolean;
        data?: { users: UserOpt[] };
      }>("/admin/users", { params: { page: 1, limit: 300 } });
      return data?.data?.users ?? [];
    },
  });

  const { data: ordersList = [] } = useQuery({
    queryKey: ["admin", "quick", "orders"],
    queryFn: async () => {
      const { data } = await apiClient.get<{
        success?: boolean;
        data?: { orders: OrderOpt[] };
      }>("/admin/orders", { params: { page: 1, limit: 300 } });
      return data?.data?.orders ?? [];
    },
  });

  const userOptions = usersList.map((u) => ({
    value: u.id,
    label:
      `users.id=${u.id} | ${u.name || "без имени"} | ${u.phone || "нет телефона"}`.trim(),
  }));

  const orderOptions = ordersList.map((o) => ({
    value: o.id,
    label: `orders.id=${o.id} | ${o.order_number || "без номера"}`.trim(),
  }));

  return (
    <Card title="Быстрые действия" size="small">
      <Typography.Paragraph type="secondary">
        {meta.disputes}
      </Typography.Paragraph>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card type="inner" title="Заблокировать пользователя" size="small">
            <Space direction="vertical" style={{ width: "100%" }}>
              <Select
                showSearch
                allowClear
                placeholder="Пользователь (поле id в таблице users)"
                style={{ width: "100%" }}
                options={userOptions}
                filterOption={(input, option) =>
                  String(option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                value={userId ?? undefined}
                onChange={(v) => setUserId(v ?? null)}
              />
              <Input.TextArea
                placeholder="Причина блокировки"
                rows={2}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
              <Button
                type="primary"
                danger
                loading={loadingUser}
                onClick={async () => {
                  if (!userId || !reason.trim()) {
                    message.warning("Выберите пользователя и укажите причину");
                    return;
                  }
                  setLoadingUser(true);
                  try {
                    await adminBlockUser(userId, reason.trim());
                    message.success(`Пользователь ${userId} заблокирован`);
                  } catch (e) {
                    message.error(e instanceof Error ? e.message : "Ошибка");
                  } finally {
                    setLoadingUser(false);
                  }
                }}
              >
                Заблокировать
              </Button>
            </Space>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card type="inner" title="Сменить статус заказа" size="small">
            <Space direction="vertical" style={{ width: "100%" }}>
              <Select
                showSearch
                allowClear
                placeholder="Заказ (поле id в таблице orders)"
                style={{ width: "100%" }}
                options={orderOptions}
                filterOption={(input, option) =>
                  String(option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                value={orderId ?? undefined}
                onChange={(v) => setOrderId(v ?? null)}
              />
              <Select
                style={{ width: "100%" }}
                value={status}
                onChange={setStatus}
                options={ORDER_STATUSES.map((s) => ({ label: s, value: s }))}
              />
              <Button
                type="primary"
                loading={loadingOrder}
                onClick={async () => {
                  if (!orderId) {
                    message.warning("Выберите заказ");
                    return;
                  }
                  setLoadingOrder(true);
                  try {
                    await adminUpdateOrderStatus(orderId, status);
                    message.success(`Заказ ${orderId} → ${status}`);
                  } catch (e) {
                    message.error(e instanceof Error ? e.message : "Ошибка");
                  } finally {
                    setLoadingOrder(false);
                  }
                }}
              >
                Применить статус
              </Button>
            </Space>
          </Card>
        </Col>
        <Col span={24}>
          <Card type="inner" title="Спор" size="small">
            <Typography.Paragraph>
              Отдельного эндпоинта спора нет: откройте заказ в таблице и смените
              статус (например <code>refunded</code>).
            </Typography.Paragraph>
            <Link href="/admin/orders">
              <Button type="default">К списку заказов</Button>
            </Link>
          </Card>
        </Col>
      </Row>
    </Card>
  );
}
