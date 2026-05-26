import { apiClient, tryCatch } from "~/src/shared/lib/api";
import { IGetData } from "~/src/shared/model";
import {
  ISellerReview,
  ISellerReviewsList,
} from "~/src/entities/profile-section/model/seller-reviews";

export const getSellerReviews = async (page = 1, limit = 20) => {
  return await tryCatch(async () => {
    const res = await apiClient.get<IGetData<ISellerReviewsList>>(
      `/seller/reviews`,
      { params: { page, limit } },
    );
    return res.data.data;
  });
};

export const replyToSellerReview = async (reviewId: number, reply: string) => {
  const res = await apiClient.put<
    IGetData<{ message: string; review: ISellerReview }>
  >(`/seller/reviews/${reviewId}/reply`, { reply });
  return res.data.data;
};
