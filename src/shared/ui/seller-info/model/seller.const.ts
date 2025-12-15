import { ISellerInfo, SellerI } from "./seller.interface";

export const sellerTest: SellerI = {
  id: 0,
  url: "",
  name: "",
  avatar: "",
  rating: "",
  reviews: "",
};

export const sellerInfoSkeleton: ISellerInfo = {
  id: 0,
  shop_name: "",
  company_name: "",
  rating: 0,
  reviews_count: 0,
  products_count: 0,
  avatar: "",
  seller_status: "",
  company_verification_status: "",
};
