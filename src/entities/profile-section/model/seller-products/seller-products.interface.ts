export interface ISellerProductBase {
  name: string;
  description: string;
  price: string;
  images: string[];
} // те, которые есть везде и которые можно изменить

export type SellerProductStatusCode =
  | "draft"
  | "pending"
  | "approved"
  | "rejected"
  | "archived";

export interface ISellerProduct extends ISellerProductBase {
  id: number;
  image: string;
  status: string;
  status_code: SellerProductStatusCode;
  slug: string;
  specifications: {
    [key: string]: boolean | string;
  };
}

export interface IEditSellerProduct extends ISellerProductBase {
  status_code: SellerProductStatusCode;
  image_upload_ids: number[];
}

export interface IEditSellerProductInput {
  placeholder: string;
  field: keyof IEditSellerProduct;
  type: "text" | "textarea" | "numeric";
}

export interface INewProduct extends ISellerProductBase {
  image_upload_ids: number[];
  [key: string]: any; // поля для фильтров, заранее неизвестны
}

export interface IProductCurrentImage {
  url: string;
  fileBinary?: string;
  upload_id?: number;
}

export type InputTypeFromApi = "text" | "select" | "numeric";
export type InputTypeForUi = "text" | "select" | "textarea" | "numeric";

export interface INewProductFilter {
  field: keyof INewProduct;
  placeholder: string;
  for_empty_value?: string | null;
  options?: string[] | null;
  type?: InputTypeFromApi;
}

export interface INewProductInput extends INewProductFilter {
  inputType?: InputTypeForUi;
}

export type SellerProductsModalType = "edit" | "new";

export interface ISellerProductsModal {
  active: boolean | null;
  type: SellerProductsModalType;
}
