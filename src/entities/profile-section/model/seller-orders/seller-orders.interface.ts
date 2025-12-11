export interface ISellerOrder {
  id: number;
  order_number: string;
  created_at: string;
  total_amount: string;
  status: string;
  status_code: SellerOrderStatusCode;
  buyer: ISellerOrderBuyer | null;
  products: ISellerOrderProduct[];
  message: string | null;
  readiness_message: string;
  delivery_method: string | null;
  track_number: string | null;
  act_file_url: string | null;
  invoice_url: string | null;
}

export interface ISellerOrderBuyer {
  name: string;
  phone: string;
  address: string;
}

export interface ISellerOrderProduct {
  image: string;
  name: string;
}

export type SellerOrderStatusCode =
  | "need_confirmation"
  | "confirmed"
  | "declined"
  | "delivered"
  | "in_delivery";
