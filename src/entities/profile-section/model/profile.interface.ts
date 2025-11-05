import { IProfile } from "~/src/features/user/model";

export interface IProfileInput {
  holder: string;
  field: keyof IProfile;
  type: "string" | "phone" | "email";
}

export interface ProfileOrderI {
  id: number;
  price: number;
  date_ordered: string;
  status: string; //Оплатите счет до 18 июня, Заказ принят и ожидает отправки
  order_bill_url?: string;
  order_delivery_date: string; //10 июля
  when_delivered?: string; //10 мая
  etiketka_url: string;
  etiketka_image_url: string;
  order_finished: boolean;
  has_review: boolean;
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
