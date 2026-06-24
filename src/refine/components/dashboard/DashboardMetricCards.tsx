"use client";

import { Card, Col, Row, Statistic } from "antd";
import type { AdminDashboardData } from "~/src/refine/api/dashboard.types";
import { formatRub } from "~/src/shared/lib/format-currency";

type Props = {
  data: AdminDashboardData;
  variant?: "admin" | "seller";
};

export function DashboardMetricCards({ data, variant = "admin" }: Props) {
  const isSeller = variant === "seller" || data.meta.scope === "seller";
  const products = data.products_summary as Record<string, number> | undefined;
  const moderation = data.moderation as Record<string, number> | undefined;

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} lg={6}>
        <Card size="small">
          <Statistic
            title={isSeller ? "Продажи (GMV)" : "GMV"}
            value={formatRub(data.financial.gmv)}
          />
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
            title={isSeller ? "К выплате" : "Выручка (комиссия)"}
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
      {isSeller ? (
        <>
          <Col xs={24} sm={12} lg={6}>
            <Card size="small">
              <Statistic
                title="Товаров одобрено"
                value={Number(products?.approved ?? 0)}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card size="small">
              <Statistic
                title="На модерации"
                value={Number(
                  moderation?.total_pending ?? products?.pending ?? 0,
                )}
              />
            </Card>
          </Col>
        </>
      ) : (
        <>
          <Col xs={24} sm={12} lg={6}>
            <Card size="small">
              <Statistic
                title="Новые продавцы"
                value={data.users.new_sellers}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card size="small">
              <Statistic
                title="Новые покупатели"
                value={data.users.new_buyers}
              />
            </Card>
          </Col>
        </>
      )}
    </Row>
  );
}
