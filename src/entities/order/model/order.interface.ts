export interface OrderPricesI {
  itemsSum: number;
  discountSum: number;
  deliveryPrice: number;
  total: number;
}

export type PersonalOrderStageType = "choose_pvz" | "confirm";

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
  field: keyof INewOrderAcceptor;
  type: "phone" | "email" | "string";
}
