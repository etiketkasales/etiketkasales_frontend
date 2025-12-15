import {
  IOrderModalInput,
  ISellerOrder,
  ISendOrderForm,
  OrderOperationConfig,
  OrderOperationFormData,
  SellerOrderOperationType,
  SellerOrderStatusCode,
} from "./seller-orders.interface";

export const sellerOrdersTest: ISellerOrder[] = [
  {
    id: 0,
    order_number: "etk1093u5025",
    created_at: "09.14.2025T12:16:07Z",
    total_amount: "",
    status: "",
    status_code: "need_confirm",
    buyer: {
      name: "",
      phone: "",
      address: "",
    },
    products: [],
    message: "",
    readiness_message: "",
    delivery_method: "",
    track_number: "",
    act_file_url: "",
    invoice_url: "",
  },
  {
    id: 1,
    order_number: "etk1093u5025",
    created_at: "09.14.2025T12:16:07Z",
    total_amount: "150.",
    status: "afa",
    status_code: "processing",
    buyer: null,
    products: [
      {
        image: "",
        name: "тестовый продукт",
      },
    ],
    message: "dsvsd",
    readiness_message: "15 dh d",
    delivery_method: "CDEK",
    track_number: "",
    act_file_url: "/15",
    invoice_url: "/15",
  },
  {
    id: 1,
    order_number: "etk1093u5025",
    created_at: "09.14.2025T12:16:07Z",
    total_amount: "150.95",
    status: "",
    status_code: "sent",
    buyer: {
      name: "Олег Какашян",
      phone: "+79528275976",
      address: "",
    },
    products: [],
    message: "",
    readiness_message: "15 dh d",
    delivery_method: "",
    track_number: "142",
    act_file_url: "",
    invoice_url: "",
  },
];

interface ISellerOrderColor {
  bg: string;
  infoBorder: string;
  border: string;
  text: string;
  textHex: string;
}

const defaultColor: ISellerOrderColor = {
  bg: "neutral-300",
  border: "#F3F4F6",
  infoBorder: "#D1D5DB",
  text: "neutral-800",
  textHex: "#374151",
};

export const sellerOrderColors: Record<
  SellerOrderStatusCode,
  ISellerOrderColor
> = {
  need_confirm: {
    bg: "blue-100",
    infoBorder: "#BACDF8",
    border: "#6F98F1",
    text: "blue-1000",
    textHex: "#05173E",
  },
  processing: {
    bg: "green-100",
    infoBorder: "#A7F3D0",
    border: "#A7F3D0",
    text: "green-1000",
    textHex: "#064E3B",
  },
  sent: defaultColor,
  completed: defaultColor,
  refunded: defaultColor,
  cancelled: defaultColor,
  in_transit: defaultColor,
  pending_payment: defaultColor,
};

export const orderOperationDataMap: Record<
  SellerOrderOperationType,
  OrderOperationFormData | null
> = {
  accept: null,
  reject: {
    rejectReason: "",
  },
  send: {
    comment: "",
    track_number: "",
  },
};

export const sendOrderModalInputs: IOrderModalInput<ISendOrderForm>[] = [
  {
    field: "track_number",
    placeholder: "Трек-номер доставки",
  },
  {
    field: "comment",
    placeholder: "Комментарий к заказу",
  },
];
