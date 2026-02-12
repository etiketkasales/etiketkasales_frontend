// calculated order prices data
export interface OrderPricesI {
  itemsSum: number;
  discountSum: number;
  deliveryPrice: number;
  total: number;
}

export type OrderType = "company" | "person";

export type OrderStageType = "choose_pvz" | "confirm";

// response for create order api endpoints
export interface ICreatedOrderDto {
  id: number;
  order_number: string;
  total_amount: string;
  delivery_cost: string;
  created_at: string; // "2025-01-07T12:00:00+00:00"
}

// response for getting delivery methods
export interface IDeliveryMethodResponse {
  id: number;
  code: string;
  name: string;
  description: string;
  display: string;
  image_url: string;
}

// selected in cart items
export interface IItemToOrder {
  product_id: number;
  product_name: string;
  quantity: number;
  price: number;
}

// data about pickup point for creating order
export interface IOrderPickupPointData {
  pickup_point_code: string | null;
}

// response for getting payment methods
export interface IPaymentMethodResponse {
  code: string;
  name: string;
  description: string;
  commission_formatted: string;
  image_url: string;
}

// data for creating order
export interface IOrderReceiver {
  receiver_name: string;
  receiver_surname: string;
  receiver_phone: string;
  receiver_email: string;
}
// input in form for create order for company
export interface INewOrderInput {
  placeholder: string;
  field: keyof IOrderReceiver;
  type: "phone" | "email" | "string";
}

// response for getting pickup points
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

// response on creating payment api endpoint
export interface ICreatePaymentDto {
  payment_id: string;
  payment_method: string;
  payment_url: string;
  amount: number;
}
