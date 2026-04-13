"use client";

import { Card, Col, Row, Statistic } from "antd";
import type { AdminDashboardData } from "~/src/refine/api/dashboard.types";
import { formatRub } from "~/src/shared/lib/format-currency";

export function DashboardMetricCards({ data }: { data: AdminDashboardData }) {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} lg={6}>
        <Card size="small">
          <Statistic title="GMV" value={formatRub(data.financial.gmv)} />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card size="small">
          <Statistic
            title="Комиссия маркетплейса"
            value={formatRub(data.financial.marketplace_commission)}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card size="small">
          <Statistic
            title="Выручка (комиссия)"
            value={formatRub(data.financial.marketplace_revenue)}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card size="small">
          <Statistic
            title="Средний чек"
            value={formatRub(data.average_check.value)}
            suffix={`/ ${data.average_check.based_on_orders} зак.`}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card size="small">
          <Statistic
            title="Заказов за период"
            value={data.orders.total_in_period}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card size="small">
          <Statistic title="Возвраты" value={data.orders.returns_refunded} />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card size="small">
          <Statistic title="Отмены" value={data.orders.cancelled} />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card size="small">
          <Statistic title="Новые продавцы" value={data.users.new_sellers} />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card size="small">
          <Statistic title="Новые покупатели" value={data.users.new_buyers} />
        </Card>
      </Col>
    </Row>
  );
}
