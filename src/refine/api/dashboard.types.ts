export type AdminDashboardPeriod = "week" | "month" | "quarter";
export type AdminChartBucket = "day" | "week" | "month";

export interface AdminDashboardFinancial {
  gmv: number;
  marketplace_commission: number;
  marketplace_revenue: number;
  orders_in_gmv: number;
}

export interface AdminDashboardData {
  period: {
    key: string;
    days: number;
    chart_bucket: AdminChartBucket;
  };
  financial: AdminDashboardFinancial;
  orders: {
    total_in_period: number;
    cancelled: number;
    returns_refunded: number;
    completed_like: number;
  };
  users: {
    new_registrations: number;
    new_sellers: number;
    new_buyers: number;
  };
  average_check: { value: number; based_on_orders: number };
  top_categories: Array<{
    id: number;
    name: string;
    revenue: number;
    orders_count: number;
  }>;
  top_sellers: Array<{
    id: number;
    name: string;
    phone: string | null;
    gmv: number;
    orders_count: number;
  }>;
  problems: {
    low_rating_reviews: {
      current_period: number;
      previous_period: number;
      growth_percent: number;
      note: string;
    };
    overdue_deliveries: { count: number; note: string };
    suspicious_orders: { count: number; note: string };
    out_of_stock: {
      approved_active_zero_stock: number;
      touched_in_period: number;
      sample_products: Array<{
        id: number;
        name: string;
        seller_id: number;
        updated_at: string;
      }>;
    };
  };
  charts: {
    gmv_and_orders: Array<{
      bucket: string;
      orders_count: number;
      gmv: number;
      commission: number;
    }>;
  };
  meta: {
    commission_rate: number;
    gmv_statuses: string[];
    disputes: string;
    qualifying_orders_without_items?: number;
    top_lists_note?: string;
  };
  products_summary: Record<string, unknown>;
  moderation: Record<string, unknown>;
}

export interface AdminDashboardResponse {
  success: boolean;
  data: AdminDashboardData;
  message?: string;
}
