export interface ISellerOrder {
  id: number;
  order_number: string;
  created_at: string;
  total_amount: string;
  status: string;
  status_code: SellerOrderStatusCode;
  buyer: ISellerOrderBuyer | null;
  products: ISellerOrderProduct[];
  message: string | null;
  readiness_message: string;
  delivery_method: string | null;
  track_number: string | null;
  act_file_url: string | null;
  invoice_url: string | null;
}

export interface ISellerOrderBuyer {
  name: string;
  phone: string;
  address: string;
}

export interface ISellerOrderProduct {
  image: string;
  name: string;
}

export type SellerOrderStatusCode =
  | "need_confirm"
  | "processing"
  | "sent"
  | "completed"
  | "cancelled"
  | "pending_payment"
  | "in_transit"
  | "refunded";

export type SellerOrderOperationType = "accept" | "reject" | "send";

export interface OrderOperationConfig<TForm> {
  initialData: TForm;
  requiredFields: (keyof TForm)[];
}

export interface ISendOrderForm {
  track_number: string;
  comment: string;
}

export interface IRejectOrderForm {
  rejectReason: string;
}

export type OrderOperationFormData = ISendOrderForm | IRejectOrderForm;

export type OrderModalType = "send" | "reject" | "";

export type OrderOperationFormMap = {
  send: ISendOrderForm;
  reject: IRejectOrderForm;
  accept: null;
};

export interface IOrderModalButton {
  title: string;
  type: "yellow" | "gray-border" | "red-border";
  onClick: () => Promise<void> | void;
}

export interface IOrderModalInput<T> {
  placeholder: string;
  field: keyof T;
}
