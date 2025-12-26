import {
  ICreateOrderForCompany,
  IDeliveryMethodResponse,
  IOrderPickupPointData,
  IOrderReceiver,
  OrderPricesI,
} from "./order.interface";

export const orderPricesS: OrderPricesI = {
  itemsSum: 0,
  discountSum: 0,
  deliveryPrice: 0,
  total: 0,
};

export const orderReceiverSkeleton: IOrderReceiver = {
  receiver_name: "",
  receiver_surname: "",
  receiver_phone: "",
  receiver_email: "",
};

export const createOrderForCompanySkeleton: ICreateOrderForCompany = {
  company_id: 0,
  receiver: orderReceiverSkeleton,
};

export const orderDeliveryMethodSkeleton: IDeliveryMethodResponse = {
  id: 0,
  code: "",
  name: "",
  description: "",
  display: "",
  image_url: "",
};

export const orderPickupPointSkeleton: IOrderPickupPointData = {
  pickup_point_address: "",
  pickup_point_id: "",
};
