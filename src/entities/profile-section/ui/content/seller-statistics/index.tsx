"use client";

import { useEffect, useState } from "react";
import { Card, Select, Space, Spin, Typography } from "antd";
import { fetchSellerDashboard } from "~/src/refine/api/admin-api";
import type {
  AdminChartBucket,
  AdminDashboardData,
  AdminDashboardPeriod,
} from "~/src/refine/api/dashboard.types";
import { DashboardMetricCards } from "~/src/refine/components/dashboard/DashboardMetricCards";
import { DashboardCharts } from "~/src/refine/components/dashboard/DashboardCharts";
import { ProblemIndicators } from "~/src/refine/components/dashboard/ProblemIndicators";
import { SellerQuickActions } from "~/src/refine/components/dashboard/SellerQuickActions";
import ProfileContentContainer from "../container";
import classes from "./seller-statistics.module.scss";

export default function SellerStatistics() {
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
        const response = await fetchSellerDashboard({
          period,
          chart_bucket: bucket,
        });
        if (mounted) {
          setData(response);
        }
      } catch (e) {
        if (mounted) {
          setError(
            e instanceof Error ? e.message : "Ошибка загрузки статистики",
          );
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
    <ProfileContentContainer className={classes.wrapper}>
      <Space direction="vertical" size={16} style={{ width: "100%" }}>
        <Card>
          <Space wrap>
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
        {loading && (
          <div className={classes.loader}>
            <Spin size="large" />
          </div>
        )}
        {error && <Card>{error}</Card>}
        {data && !loading && (
          <Space direction="vertical" size={16} style={{ width: "100%" }}>
            <DashboardMetricCards data={data} variant="seller" />
            <DashboardCharts data={data} variant="seller" />
            <ProblemIndicators data={data} variant="seller" />
            <SellerQuickActions />
          </Space>
        )}
      </Space>
    </ProfileContentContainer>
  );
}
