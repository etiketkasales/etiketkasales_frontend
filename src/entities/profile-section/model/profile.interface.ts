import { IChangeableProfile } from "~/src/features/user/model";

export interface IProfileInput {
  holder: string;
  field: keyof IChangeableProfile | "phone";
  type: "string" | "phone" | "email" | "checkbox";
}

export interface IOrderResponseItem {
  id: number;
  name: string;
  preview_image: string;
  price: string;
  product_id: number;
  product_name: string;
  quantity: string;
  total: string;
}

export interface IOrder {
  id: number;
  comment: string;
  items: IOrderResponseItem[];
  order_number: string;
  payment_method: string | null;
  preview_image: string;
  receiver_phone: string;
  status: string;
  status_code: string;
  total_amount: string;
  delivery_address: string;
  created_at: string; //2025-01-07T12:00:00Z
  updated_at: string; //2025-01-07T12:00:00Z
  invoice_url?: string;
}

export type BuyerSectionType =
  | "personal"
  | "orders"
  | "addresses"
  | "as_legal"
  | "logout";

export type SellerSectionType =
  | "quote"
  | "profile"
  | "reviews"
  | "seller_orders"
  | "products"
  | "promotion"
  | "accounting"
  | "statistics"
  | "delete";

export type ProfileActionType = BuyerSectionType | SellerSectionType;

export interface IAsideItem {
  title: string;
  action: ProfileActionType;
}

export interface IProfileLegalInputsSection {
  title: string;
  inputs: IProfileInput[];
}
