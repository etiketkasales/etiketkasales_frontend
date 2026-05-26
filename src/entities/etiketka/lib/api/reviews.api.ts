import { apiClient, tryCatch } from "~/src/shared/lib/api";
import { IGetData } from "~/src/shared/model";
import {
  ICreateProductReviewPayload,
  IProductReview,
  IProductReviewsList,
} from "~/src/entities/etiketka/model/reviews.interface";

export const getProductReviews = async (
  productId: number,
  page = 1,
  limit = 20,
) => {
  return await tryCatch(async () => {
    const res = await apiClient.get<IGetData<IProductReviewsList>>(
      `/products/${productId}/reviews`,
      { params: { page, limit } },
    );
    return res.data.data;
  });
};

export const createProductReview = async (
  productId: number,
  payload: ICreateProductReviewPayload,
) => {
  const res = await apiClient.post<
    IGetData<{ review: IProductReview; message: string }>
  >(`/products/${productId}/reviews`, payload);
  return res.data.data;
};

export const uploadReviewImage = async (file: File) => {
  return await tryCatch(async () => {
    const formData = new FormData();
    formData.append("image", file);
    const res = await apiClient.post<
      IGetData<{ url: string; filename: string }>
    >(`/upload/review-image`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.data;
  });
};
