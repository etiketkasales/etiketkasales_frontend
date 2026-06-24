"use client";

import Link from "next/link";
import { Button, Card, Col, Row, Typography } from "antd";

export function SellerQuickActions() {
  return (
    <Card title="Быстрые действия" size="small">
      <Typography.Paragraph type="secondary">
        Перейдите к разделам кабинета продавца для работы с заказами и
        каталогом.
      </Typography.Paragraph>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Card type="inner" title="Заказы" size="small">
            <Typography.Paragraph>
              Примите, отправьте или отклоните заказы покупателей.
            </Typography.Paragraph>
            <Link href="/profile/seller?active_section=seller_orders">
              <Button type="primary">К заказам</Button>
            </Link>
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card type="inner" title="Карточки товаров" size="small">
            <Typography.Paragraph>
              Добавьте товары или обновите остатки и цены.
            </Typography.Paragraph>
            <Link href="/profile/seller?active_section=products">
              <Button type="default">К товарам</Button>
            </Link>
          </Card>
        </Col>
      </Row>
    </Card>
  );
}
