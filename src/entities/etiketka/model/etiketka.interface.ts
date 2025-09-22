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
