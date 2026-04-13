"use client";

import { Card, Col, Row } from "antd";
import type { AdminDashboardData } from "~/src/refine/api/dashboard.types";
import { formatRub } from "~/src/shared/lib/format-currency";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function DashboardCharts({ data }: { data: AdminDashboardData }) {
  const lineData = data.charts.gmv_and_orders.map((p) => ({
    name: p.bucket,
    gmv: p.gmv,
    orders: p.orders_count,
  }));

  const categories = data.top_categories.map((c) => ({
    name: c.name.length > 14 ? `${c.name.slice(0, 12)}...` : c.name,
    revenue: c.revenue,
  }));

  const sellers = data.top_sellers.map((s) => ({
    name: s.name?.length ? s.name.slice(0, 12) : `#${s.id}`,
    gmv: s.gmv,
  }));

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} lg={14}>
        <Card title="Динамика GMV и заказов" size="small">
          <div style={{ width: "100%", height: 320 }}>
            <ResponsiveContainer>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fontSize: 11 }}
                />
                <Tooltip
                  formatter={(v: number, name: string) =>
                    name === "gmv" ? formatRub(v) : v
                  }
                />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="gmv"
                  name="GMV"
                  stroke="#1677ff"
                  dot={false}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="orders"
                  name="Заказы"
                  stroke="#52c41a"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </Col>
      <Col xs={24} lg={10}>
        <Card title="Топ категорий" size="small">
          <div style={{ width: "100%", height: 320 }}>
            <ResponsiveContainer>
              <BarChart
                data={categories}
                layout="vertical"
                margin={{ left: 8 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={110}
                  tick={{ fontSize: 10 }}
                />
                <Tooltip formatter={(v: number) => formatRub(v)} />
                <Bar dataKey="revenue" fill="#722ed1" name="Выручка" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </Col>
      <Col span={24}>
        <Card title="Топ продавцов" size="small">
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={sellers}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis />
                <Tooltip formatter={(v: number) => formatRub(v)} />
                <Bar dataKey="gmv" fill="#fa8c16" name="GMV" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </Col>
    </Row>
  );
}
