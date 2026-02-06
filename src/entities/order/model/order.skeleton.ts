import {
  ICreateOrderForCompany,
  IDeliveryMethodResponse,
  IOrderPickupPointData,
  IOrderPickupPointResponse,
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

export const orderPickupPointResponseSkeleton: IOrderPickupPointResponse = {
  id: "",
  code: "",
  name: "",
  latitude: 0,
  longitude: 0,
  full_address: "",
  delivery_days: "",
  delivery_time: {
    formatted: "",
  },
  work_hours: "",
  cost_formatted: "",
};
