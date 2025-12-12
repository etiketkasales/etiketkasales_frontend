import {
  IEditSellerProduct,
  IEditSellerProductInput,
  INewProduct,
  INewProductInput,
  SellerProductStatusCode,
} from "./seller-products.interface";

export const newProductSkeleton: INewProduct = {
  name: "",
  description: "",
  images: [],
  image_uploads_ids: [],
  price: "",
  status_code: "approved",
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
    type: "numeric",
  },
  {
    placeholder: "Описание товара",
    field: "description",
    type: "textarea",
  },
];

export const editProductInputs: IEditSellerProductInput[] = [
  {
    placeholder: "Название товара",
    field: "name",
    type: "text",
  },
  {
    placeholder: "Цена за единицу",
    field: "price",
    type: "numeric",
  },
  {
    placeholder: "Описание товара",
    field: "description",
    type: "textarea",
  },
];

export const editProductRequiredFields: (keyof IEditSellerProduct)[] = [
  "name",
  "price",
  "description",
  "images",
  "image_upload_ids",
];

export const newProductRequiredFields: (keyof INewProduct)[] = [
  "name",
  "price",
  "description",
  "images",
  "image_upload_ids",
];

export const modalTitles = {
  new: "Добавить товар",
  edit: "Редактировать товар",
};

export const editSellerProductSkeleton: IEditSellerProduct = {
  name: "",
  description: "",
  image_upload_ids: [],
  price: "",
  images: [],
  status_code: "approved",
};

export const sellerProductStatusColors: Record<
  SellerProductStatusCode,
  string
> = {
  approved: "green-700",
  rejected: "red-700",
  archived: "blue-600",
  draft: "blue-600",
  pending: "red-700",
};
