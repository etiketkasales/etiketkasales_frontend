import { EtiketkaI, IEtiketka } from "./etiketka.interface";

export const etiketkaSkeleton: EtiketkaI = {
  id: 0,
  url: "",
  seller_id: 0,
  title: "",
  category_id: 0,
  cover_image: "",
  images: [],
  price: 0,
  old_price: 0,
};

export const productSkeleton: IEtiketka = {
  id: 0,
  name: "",
  slug: "",
  description: "",
  price: "",
  old_price: "",
  images: [],
  specifications: [],
  seller_id: 0,
  seller_name: "",
  company_name: "",
  category_id: 0,
  category_name: "",
};
