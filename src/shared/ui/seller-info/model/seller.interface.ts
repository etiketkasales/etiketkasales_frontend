export interface SellerI {
  id: number;
  url: string;
  name: string;
  avatar: string;
  rating: string;
  reviews: string;
}

export interface ISellerInfo {
  id: number;
  shop_name: string;
  company_name: string;
  rating: number;
  reviews_count: number;
  products_count: number;
  avatar: string;
  seller_status: string;
  company_verification_status: string;
}
