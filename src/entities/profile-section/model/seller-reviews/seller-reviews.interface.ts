export type SellerReviewModerationStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "hidden";

export type SellerReplyStatus = "none" | "pending" | "approved" | "hidden";

export interface ISellerReviewPhoto {
  url: string;
}

export interface ISellerReview {
  id: number;
  product_id: number;
  product_name?: string;
  user_name?: string | null;
  rating: number;
  title?: string | null;
  comment?: string | null;
  pros?: string | null;
  cons?: string | null;
  photos?: ISellerReviewPhoto[];
  moderation_status: SellerReviewModerationStatus;
  is_published?: boolean | number;
  seller_reply?: string | null;
  seller_reply_at?: string | null;
  seller_reply_status?: SellerReplyStatus;
  created_at: string;
}

export interface ISellerReviewsList {
  items: ISellerReview[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}
