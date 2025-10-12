export interface IGetCart {
  items: ICartItem[];
}

export interface ICartItem {
  id: number;
  product_id: number;
  quantity: number;
  price: string;
  name: string;
  images: string[];
  seller_id: number;
  seller_name: string;
}

export interface ICartTotal {
  subtotal: string;
  item_count: number;
  unique_products: number;
  unique_sellers: number;
}

export interface IValidateCart {
  items: ICartItem[];
  total: {
    subtotal: string;
    item_count: number;
  };
  warnings: string[];
}
