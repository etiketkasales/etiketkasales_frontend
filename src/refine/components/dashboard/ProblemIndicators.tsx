"use client";

import {
  Alert,
  Badge,
  Card,
  Col,
  List,
  Row,
  Space,
  Tag,
  Typography,
} from "antd";
import { ExclamationCircleOutlined, WarningOutlined } from "@ant-design/icons";
import type { AdminDashboardData } from "~/src/refine/api/dashboard.types";

export function ProblemIndicators({ data }: { data: AdminDashboardData }) {
  const p = data.problems;
  const bad =
    p.low_rating_reviews.growth_percent > 0 ||
    p.overdue_deliveries.count > 0 ||
    p.suspicious_orders.count > 0 ||
    p.out_of_stock.approved_active_zero_stock > 0;

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={12}>
        <Badge.Ribbon text="Жалобы" color="volcano">
          <Card size="small">
            <Space direction="vertical">
              <Typography.Text strong>
                <WarningOutlined /> Низкие отзывы ({"<="} 2)
              </Typography.Text>
              <Typography.Text>
                Период: <Tag>{p.low_rating_reviews.current_period}</Tag> рост:{" "}
                <Tag
                  color={
                    p.low_rating_reviews.growth_percent > 0 ? "red" : "green"
                  }
                >
                  {p.low_rating_reviews.growth_percent}%
                </Tag>
              </Typography.Text>
              <Typography.Text type="secondary">
                {p.low_rating_reviews.note}
              </Typography.Text>
            </Space>
          </Card>
        </Badge.Ribbon>
      </Col>
      <Col xs={24} md={12}>
        <Badge.Ribbon text="Доставка" color="red">
          <Card size="small">
            <Typography.Text strong>
              <ExclamationCircleOutlined /> Просроченные доставки
            </Typography.Text>
            <Typography.Title level={3} style={{ margin: 0 }}>
              {p.overdue_deliveries.count}
            </Typography.Title>
            <Typography.Text type="secondary">
              {p.overdue_deliveries.note}
            </Typography.Text>
          </Card>
        </Badge.Ribbon>
      </Col>
      <Col xs={24} md={12}>
        <Card size="small" title="Подозрительные заказы">
          <Typography.Title level={3} style={{ margin: 0 }}>
            {p.suspicious_orders.count}
          </Typography.Title>
          <Typography.Text type="secondary">
            {p.suspicious_orders.note}
          </Typography.Text>
        </Card>
      </Col>
      <Col xs={24} md={12}>
        <Card size="small" title="Out of stock">
          <Typography.Text>
            Всего:{" "}
            <Tag color="magenta">
              {p.out_of_stock.approved_active_zero_stock}
            </Tag>
          </Typography.Text>
          <List
            size="small"
            dataSource={p.out_of_stock.sample_products}
            renderItem={(it) => (
              <List.Item>
                {it.name}{" "}
                <Typography.Text type="secondary">#{it.id}</Typography.Text>
              </List.Item>
            )}
          />
        </Card>
      </Col>
      {bad && (
        <Col span={24}>
          <Alert
            type="warning"
            showIcon
            message="Проблемные зоны требуют внимания"
            description="Проверьте заказы/пользователей и выполните быстрые действия."
          />
        </Col>
      )}
    </Row>
  );
}
