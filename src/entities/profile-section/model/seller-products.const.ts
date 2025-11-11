import {
  INewProduct,
  INewProductInput,
  ISellerProductBase,
} from "./seller-products.interface";

export const newProductSkeleton: INewProduct = {
  name: "",
  description: "",
  images: [],
  price: "",
};

export const newProductMainInputs: INewProductInput[] = [
  {
    placeholder: "Название товара",
    field: "name",
    type: "text",
  },
  {
    placeholder: "Цена за единицу",
    field: "price",
    type: "text",
  },
  {
    placeholder: "Описание товара",
    field: "description",
    type: "textarea",
  },
];
