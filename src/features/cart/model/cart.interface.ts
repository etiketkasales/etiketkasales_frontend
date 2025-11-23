export interface IGetCart {
  items: ICartItem[];
  total: ICartTotal;
}

export interface ICartItem {
  id: number;
  user_id: number | null;
  product_id: number;
  quantity: number;
  price: string;
  old_price: string | null;
  created_at: string;
  updated_at: string;
  name: string;
  slug: string;
  images: string[];
  stock_quantity: number;
  min_order_quantity: number;
  material: string;
  color: string;
  size: string;
  type: string;
  form: string;
  seller_id: number;
  seller_name: string;
  company_name: null;
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
