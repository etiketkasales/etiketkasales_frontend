import {
  ICreateOrderBase,
  ICreateOrderForCompany,
  INewOrderAcceptor,
  INewOrderInfo,
  OrderPricesI,
} from "./order.interface";

export const orderPricesS: OrderPricesI = {
  itemsSum: 0,
  discountSum: 0,
  deliveryPrice: 0,
  total: 0,
};

export const newOrderAcceptorSkeleton: INewOrderAcceptor = {
  name: "",
  surname: "",
  phone: "",
  email: "",
};

export const newOrderSkeleton: INewOrderInfo = {
  delivery_address: "",
  delivery_method: "",
  acceptor: newOrderAcceptorSkeleton,
  purchase_method: "",
};

export const createOrderSkeleton: ICreateOrderBase = {
  delivery_address_id: 0,
  delivery_method: "",
};

export const createOrderForCompanySkeleton: ICreateOrderForCompany = {
  ...createOrderSkeleton,
  company_id: 0,
  receiver: {
    receiver_name: "",
    receiver_surname: "",
    receiver_phone: "",
    receiver_email: "",
  },
};
