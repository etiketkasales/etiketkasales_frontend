import { ISellerOrder, SellerOrderStatusCode } from "./seller-orders.interface";

export const sellerOrdersTest: ISellerOrder[] = [
  {
    id: 0,
    order_number: "etk1093u5025",
    created_at: "09.14.2025T12:16:07Z",
    total_amount: "",
    status: "",
    status_code: "need_confirmation",
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
    status: "",
    status_code: "delivered",
    buyer: null,
    products: [
      {
        image: "",
        name: "тестовый продукт",
      },
    ],
    message: "",
    readiness_message: "15 dh d",
    delivery_method: "CDEK",
    track_number: "",
    act_file_url: "15",
    invoice_url: "15",
  },
  {
    id: 1,
    order_number: "etk1093u5025",
    created_at: "09.14.2025T12:16:07Z",
    total_amount: "150.95",
    status: "",
    status_code: "confirmed",
    buyer: {
      name: "Олег Какашян",
      phone: "+79528275976",
      address: "",
    },
    products: [],
    message: "",
    readiness_message: "15 dh d",
    delivery_method: "",
    track_number: "",
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
export const sellerOrderColors: Record<
  SellerOrderStatusCode,
  ISellerOrderColor
> = {
  need_confirmation: {
    bg: "blue-100",
    infoBorder: "#BACDF8",
    border: "#6F98F1",
    text: "blue-1000",
    textHex: "#05173E",
  },
  confirmed: {
    bg: "green-100",
    infoBorder: "#A7F3D0",
    border: "#A7F3D0",
    text: "green-1000",
    textHex: "#064E3B",
  },
  delivered: {
    bg: "neutral-300",
    border: "#F3F4F6",
    infoBorder: "#D1D5DB",
    text: "neutral-800",
    textHex: "#374151",
  },
  declined: {
    bg: "neutral-300",
    infoBorder: "#D1D5DB",
    border: "#F3F4F6",
    text: "neutral-800",
    textHex: "#374151",
  },
  in_delivery: {
    bg: "neutral-300",
    infoBorder: "#D1D5DB",
    border: "#F3F4F6",
    text: "neutral-800",
    textHex: "#374151",
  },
};
