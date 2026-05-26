"use client";

import { useCallback, useEffect, useState } from "react";
import { AxiosError } from "axios";
import { promiseWrapper } from "~/src/shared/lib";
import {
  getSellerReviews,
  replyToSellerReview,
} from "~/src/entities/profile-section/lib/api/seller/reviews";
import { ISellerReview } from "~/src/entities/profile-section/model/seller-reviews";

interface Props {
  needLoadEffect?: boolean;
}

export function getSellerReviewApiError(error: unknown): string {
  const axiosErr = error as AxiosError<{ message?: string }>;
  return (
    axiosErr.response?.data?.message ||
    "Не удалось выполнить запрос. Попробуйте позже."
  );
}

export const useSellerReviews = ({ needLoadEffect }: Props) => {
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [reviews, setReviews] = useState<ISellerReview[]>([]);
  const [replyingId, setReplyingId] = useState<number | null>(null);

  const promiseCallback = useCallback(
    async (callback: () => Promise<void>, isMore = false) => {
      await promiseWrapper({
        setLoading: isMore ? setLoadingMore : setLoading,
        callback,
      });
    },
    [],
  );

  const loadPage = useCallback(
    async (pageNum: number, append: boolean) => {
      await promiseCallback(async () => {
        const data = await getSellerReviews(pageNum);
        const items = data?.items ?? [];
        setReviews((prev) => (append ? [...prev, ...items] : items));
        setTotal(data?.pagination?.total ?? 0);
        setPage(pageNum);
      }, append);
    },
    [promiseCallback],
  );

  const reload = useCallback(async () => {
    await loadPage(1, false);
  }, [loadPage]);

  const loadMore = useCallback(async () => {
    if (reviews.length >= total) return;
    await loadPage(page + 1, true);
  }, [loadPage, page, reviews.length, total]);

  const submitReply = useCallback(async (reviewId: number, text: string) => {
    setReplyingId(reviewId);
    try {
      const data = await replyToSellerReview(reviewId, text);
      if (data?.review) {
        setReviews((prev) =>
          prev.map((r) => (r.id === reviewId ? data.review : r)),
        );
      }
      return data?.message ?? "Ответ отправлен на модерацию";
    } finally {
      setReplyingId(null);
    }
  }, []);

  useEffect(() => {
    if (needLoadEffect) {
      void reload();
    }
  }, [needLoadEffect, reload]);

  const hasMore = reviews.length < total;

  return {
    reviews,
    loading,
    loadingMore,
    hasMore,
    reload,
    loadMore,
    submitReply,
    replyingId,
  };
};
