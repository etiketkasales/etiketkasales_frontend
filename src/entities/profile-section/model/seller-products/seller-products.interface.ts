export interface ISellerProductBase {
  name: string;
  description: string;
  price: string;
  images: string[];
} // те, которые есть везде и которые можно изменить

export interface ISellerProduct extends ISellerProductBase {
  id: number;
  image: string;
  status: string;
  status_code: string; // "moderation" | "in_archive" etc
  slug: string;
  specifications: {
    [key: string]: boolean;
  };
}

export interface IEditSellerProduct extends ISellerProductBase {
  image_upload_ids: number[];
}

export interface IEditSellerProductInput {
  placeholder: string;
  field: keyof IEditSellerProduct;
  type: "text" | "textarea" | "numeric";
}

export interface INewProduct extends ISellerProductBase {
  [key: string]: any; // поля для фильтров, заранее неизвестны
}

export interface INewProductFilter {
  field: keyof INewProduct;
  placeholder: string;
  for_empty_value?: string | null;
  options?: string[] | null;
}

export interface INewProductInput extends INewProductFilter {
  type?: "text" | "select" | "textarea" | "numeric";
}

export type SellerProductsModalType = "edit" | "new" | null;
