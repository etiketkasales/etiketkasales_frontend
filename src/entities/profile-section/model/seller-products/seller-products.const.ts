import {
  IEditSellerProduct,
  IEditSellerProductInput,
  INewProduct,
  INewProductInput,
  ISellerProduct,
} from "./seller-products.interface";

export const sellerProductsTest: ISellerProduct[] = [
  {
    id: 1,
    image: "",
    status: "Активен",
    status_code: "active",
    slug: "test",
    specifications: {},
    name: "test",
    description: "test",
    price: "100",
    images: [],
  },
  {
    id: 2,
    image: "",
    status: "Активен",
    status_code: "active",
    slug: "test",
    specifications: {},
    name: "test",
    description: "test",
    price: "100",
    images: [],
  },
  {
    id: 3,
    image: "",
    status: "Активен",
    status_code: "active",
    slug: "test",
    specifications: {},
    name: "test",
    description: "test",
    price: "100",
    images: [],
  },
  {
    id: 4,
    image: "",
    status: "Активен",
    status_code: "active",
    slug: "test",
    specifications: {},
    name: "test",
    description: "test",
    price: "100",
    images: [],
  },
];

export const newProductSkeleton: INewProduct = {
  name: "",
  description: "",
  images: [],
  image_uploads_ids: [],
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
};
