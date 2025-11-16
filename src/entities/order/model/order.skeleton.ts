import {
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
