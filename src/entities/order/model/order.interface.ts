export interface OrderPricesI {
  itemsSum: number;
  discountSum: number;
  deliveryPrice: number;
  total: number;
}

export type OrderStageType = "choose_pvz" | "confirm";

export interface IOrderDeliveryMethod {
  name: string;
  image: string;
}

export interface INewOrderAcceptor {
  name: string;
  surname: string;
  phone: string;
  email: string;
}

export interface INewOrderInfo {
  delivery_address: string;
  delivery_method: string;
  acceptor: INewOrderAcceptor;
  purchase_method: string;
}

export interface INewOrderInput {
  placeholder: string;
  field: keyof IOrderReceiver;
  type: "phone" | "email" | "string";
}

// API
export interface IDeliveryMethodResponse {
  id: number;
  code: string;
  name: string;
  description: string;
  display: string;
  image_url: string;
}

// deprecated
export interface IProductForDeliveryMethod {
  id: number;
  weight: number;
}

export interface IItemToOrder {
  product_id: number;
  product_name: string;
  quantity: number;
  price: number;
}

export interface IOrderPickupPointData {
  pickup_point_code: string | null;
}

export interface IPaymentMethodResponse {
  code: string;
  name: string;
  description: string;
  commission_formatted: string;
  image_url: string;
}

export interface IOrderReceiver {
  receiver_name: string;
  receiver_surname: string;
  receiver_phone: string;
  receiver_email: string;
}

export interface ICreateOrderForCompany {
  company_id: number;
  receiver: IOrderReceiver;
}

export interface IOrderPickupPointResponse {
  id: string;
  code: string;
  name: string;
  full_address: string;
  cost_formatted: string;
  latitude: number;
  longitude: number;
  delivery_days: string;
  delivery_time: {
    formatted: string;
  };
  work_hours: string;
}

export type OrderType = "company" | "person";
