import { IChangeableProfile } from "~/src/features/user/model";

export interface IProfileInput {
  holder: string;
  field: keyof IChangeableProfile | "phone";
  type: "string" | "phone" | "email";
}

export interface IOrder {
  id: number;
  user_id: number;
  order_number: string;
  status: string;
  total_amount: string;
  delivery_method: string;
  delivery_address: string;
  created_at: string; //2025-01-07T12:00:00Z
  updated_at: string; //2025-01-07T12:00:00Z
  user_name: string;
  user_surname: string;
  bill_url?: string;
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
  | "orders"
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
