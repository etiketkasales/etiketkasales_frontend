"use client";

import { useEffect, useState } from "react";
import { Alert, Card, Select, Space, Spin, Typography } from "antd";
import { fetchAdminDashboard } from "~/src/refine/api/admin-api";
import type {
  AdminChartBucket,
  AdminDashboardData,
  AdminDashboardPeriod,
} from "~/src/refine/api/dashboard.types";
import { DashboardMetricCards } from "~/src/refine/components/dashboard/DashboardMetricCards";
import { DashboardCharts } from "~/src/refine/components/dashboard/DashboardCharts";
import { ProblemIndicators } from "~/src/refine/components/dashboard/ProblemIndicators";
import { QuickActions } from "~/src/refine/components/dashboard/QuickActions";

export default function AdminDashboardPage() {
  const [period, setPeriod] = useState<AdminDashboardPeriod>("month");
  const [bucket, setBucket] = useState<AdminChartBucket>("day");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<AdminDashboardData | null>(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchAdminDashboard({
          period,
          chart_bucket: bucket,
        });
        if (mounted) {
          setData(response);
        }
      } catch (e) {
        if (mounted) {
          setError(e instanceof Error ? e.message : "Ошибка загрузки дашборда");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };
    void load();
    return () => {
      mounted = false;
    };
  }, [period, bucket]);

  return (
    <Space direction="vertical" size={16} style={{ width: "100%" }}>
      <Card>
        <Space>
          <Typography.Text strong>Период</Typography.Text>
          <Select
            value={period}
            onChange={setPeriod}
            options={[
              { label: "7 дней", value: "week" },
              { label: "30 дней", value: "month" },
              { label: "90 дней", value: "quarter" },
            ]}
            style={{ width: 140 }}
          />
          <Typography.Text strong>График</Typography.Text>
          <Select
            value={bucket}
            onChange={setBucket}
            options={[
              { label: "По дням", value: "day" },
              { label: "По неделям", value: "week" },
              { label: "По месяцам", value: "month" },
            ]}
            style={{ width: 150 }}
          />
        </Space>
      </Card>
      {loading && <Spin size="large" />}
      {error && <Card>{error}</Card>}
      {data && !loading && (
        <Space direction="vertical" size={16} style={{ width: "100%" }}>
          {(() => {
            const noItems = data.meta.qualifying_orders_without_items ?? 0;
            const topsEmpty =
              data.financial.gmv > 0 &&
              data.top_categories.length === 0 &&
              data.top_sellers.length === 0;
            if (noItems <= 0 && !topsEmpty) return null;
            return (
              <Alert
                type="info"
                showIcon
                message="Топы категорий и продавцов"
                description={
                  <>
                    {data.meta.top_lists_note ? (
                      <Typography.Paragraph style={{ marginBottom: 8 }}>
                        {data.meta.top_lists_note}
                      </Typography.Paragraph>
                    ) : null}
                    {noItems > 0 ? (
                      <Typography.Text type="secondary">
                        Заказов в статусах GMV без строк в order_items:{" "}
                        <strong>{noItems}</strong>
                      </Typography.Text>
                    ) : null}
                  </>
                }
              />
            );
          })()}
          <DashboardMetricCards data={data} />
          <DashboardCharts data={data} />
          <ProblemIndicators data={data} />
          <QuickActions meta={data.meta} />
        </Space>
      )}
    </Space>
  );
}
