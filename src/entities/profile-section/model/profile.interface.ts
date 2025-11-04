export interface ProfileInputI {
  holder: string;
  field: keyof IChangeUserData;
  type: "string" | "phone";
}

export interface ProfileLegalEntityI {
  id: number;
  title: string;
  adress: string;
  inn: number;
  ogrn: number;
  kpp: number;
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

export interface IChangeUserData {
  name: string;
  surname: string;
  email: string;
  phone: string;
}

export type BuyerSectionType =
  | "personal"
  | "orders"
  | "addresses"
  | "as-legal"
  | "logout";

export type SellerSectionType =
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
