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

export interface IChangeableProfile {
  email: string | null;
  name: string | null;
  surname: string | null;
  avatar: string | null;
  company_name: string | null;
  company_type: string | null;
  shop_name: string | null;
  inn: string | null;
  kpp: string | null;
  ogrn: string | null;
  legal_address: string | null;
  actual_address: string | null;
  storage_city: string | null;
  company_address: string | null;
  bank_account: string | null;
  bank_bik: string | null;
  correspondent_account: string | null;
  bank_name: string | null;
  director_surname: string | null;
  director_name: string | null;
  director_patronymic: string | null;
  accountant_is_director: boolean;
  accountant_surname: string | null;
  accountant_name: string | null;
  accountant_patronymic: string | null;
  agreement_accepted: boolean;
}
