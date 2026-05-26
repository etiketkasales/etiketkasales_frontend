export interface IProductReviewPhoto {
  url: string;
}

export interface IProductReview {
  id: number;
  user_id: number;
  product_id: number;
  rating: number;
  title?: string | null;
  comment?: string | null;
  pros?: string | null;
  cons?: string | null;
  photos: IProductReviewPhoto[];
  is_verified: boolean;
  likes_count: number;
  dislikes_count: number;
  seller_reply?: string | null;
  seller_reply_at?: string | null;
  created_at: string;
  user_name?: string | null;
}

export interface IProductReviewsSummary {
  total: number;
  avg_rating: number | null;
}

export interface IProductReviewsList {
  items: IProductReview[];
  summary: IProductReviewsSummary;
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}

export interface ICreateProductReviewPayload {
  rating: number;
  title?: string;
  comment?: string;
  pros?: string;
  cons?: string;
  photos?: { url: string }[];
}
