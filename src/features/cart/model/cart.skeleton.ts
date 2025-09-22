import { EtiketkaI } from "~/src/entities/etiketka/model/etiketka.interface";

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
