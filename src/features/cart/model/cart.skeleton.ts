import { EtiketkaI } from "~/src/entities/etiketka/model/etiketka.interface";
import { ICartTotal } from "./cart.interface";

export const cartItemSkeleton: EtiketkaI = {
  id: 0,
  url: "",
  in_cart_count: 0,
  seller_id: 0,
  cover_image: "",
  title: "",
  is_in_favourites: false,
  price: 0,
  old_price: 0,
  images: [],
  category_id: 0,
};

export const cartTotalSkeleton: ICartTotal = {
  item_count: 0,
  unique_products: 0,
  unique_sellers: 0,
  subtotal: "",
};
