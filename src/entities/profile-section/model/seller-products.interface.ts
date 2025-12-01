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
}

export interface INewProduct extends ISellerProductBase {
  image_uploads_ids: number[];
  [key: string]: any; // поля для фильтров, заранее неизвестны
}

export interface INewProductInput {
  placeholder: string;
  field: keyof ISellerProductBase;
  type?: "text" | "select" | "textarea" | "number";
  selectOptions?: string[];
}
