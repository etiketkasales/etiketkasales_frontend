// new API
export interface IEtiketka {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string;
  old_price?: string;
  quantity: number;
  images: string[];
  specifications: ISpecification[];
  seller_id: number;
  seller_name: string;
  company_name: string;
  category_id: number;
  category_name: string;
}

export interface ISpecification {
  title: string;
  value: string;
}

export interface ISearchParameters {
  category_id?: number;
  min_price?: number;
  max_price?: number;
  search?: string;
  material?: string;
  type?: string;
  form?: string;
  page?: number;
  per_page?: number;
}

export interface ISearchEtiketka extends IEtiketka {
  material: string;
  type: string;
  form: string;
}

interface ISearchBase {
  products: ISearchEtiketka[];
}

interface ISearchPaginationBase {
  current_page: number;
  total: number;
}

export interface ISearchPagination extends ISearchPaginationBase {
  per_page: number;
  last_page: number;
}

export interface ISearchEtiketkaResponse extends ISearchBase {
  pagination: ISearchPagination;
}

export interface ISearchEtiketkaByInput extends ISearchBase {
  pagination: ISearchPaginationBase;
}

export interface ICategoryBySlug {
  id: number;
  name: string;
  slug: string;
}

export interface IGetProductsBySlug {
  category: ICategoryBySlug;
  products: IEtiketka[];
}

//

export interface EtiketkaI {
  id: number;
  seller_id: number;
  category_id: number;
  title: string;
  url: string;
  price: number;
  old_price: number;
  images: string[];
  cover_image: string;
  in_cart_count?: number;
  is_in_favourites?: boolean;
}

export interface CharacterI {
  title: string;
  value: string;
}

export type CurrentIndexI = "descr" | "character" | "seller" | "sertificates";

export interface EtiketkaInfoButtonI {
  title: string;
  action: CurrentIndexI;
}
