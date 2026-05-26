"use client";

import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  createProductReview,
  getProductReviews,
  uploadReviewImage,
} from "../api/reviews.api";
import { ICreateProductReviewPayload } from "~/src/entities/etiketka/model/reviews.interface";

export const productReviewsQueryKey = (productId: number) =>
  ["product-reviews", productId] as const;

export const useProductReviews = (productId: number) => {
  return useInfiniteQuery({
    queryKey: productReviewsQueryKey(productId),
    queryFn: ({ pageParam }) => getProductReviews(productId, pageParam),
    initialPageParam: 1,
    getNextPageParam: (last) =>
      last.pagination.page < last.pagination.total_pages
        ? last.pagination.page + 1
        : undefined,
    enabled: productId > 0,
  });
};

export const useCreateProductReview = (productId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ICreateProductReviewPayload) =>
      createProductReview(productId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["product-reviews", productId],
      });
    },
  });
};

export const useUploadReviewImage = () => {
  return useMutation({
    mutationFn: (file: File) => uploadReviewImage(file),
  });
};

export function getReviewApiErrorMessage(error: unknown): string {
  const axiosErr = error as AxiosError<{ message?: string }>;
  return (
    axiosErr.response?.data?.message ||
    "Не удалось выполнить запрос. Попробуйте позже."
  );
}
