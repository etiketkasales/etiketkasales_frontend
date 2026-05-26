"use client";

import classNames from "classnames";
import {
  getSellerReviewApiError,
  useSellerReviews,
} from "~/src/entities/profile-section/lib/hooks/seller-reviews/useSellerReviews.hook";
import { profileTitlesMap } from "~/src/entities/profile-section/model";
import ProfileContentContainer from "../container";
import SellerReviewItem from "./item";
import classes from "./seller-reviews.module.scss";
import Button from "~/src/shared/ui/button";
import { useCreateNotification } from "~/src/widgets/notifications/lib/hooks";

export default function SellerReviews() {
  const createNotification = useCreateNotification();
  const {
    reviews,
    loading,
    loadingMore,
    hasMore,
    loadMore,
    submitReply,
    replyingId,
  } = useSellerReviews({ needLoadEffect: true });

  const handleReply = async (reviewId: number, text: string) => {
    try {
      const message = await submitReply(reviewId, text);
      createNotification(message, "success");
      return message;
    } catch (err) {
      createNotification(getSellerReviewApiError(err), "error");
      throw err;
    }
  };

  return (
    <ProfileContentContainer
      className={classNames(classes.container, "flex-column relative")}
      title={profileTitlesMap.reviews}
      loading={loading && reviews.length === 0}
    >
      <p className="text-body m text-neutral-700">
        Отзывы по вашим товарам. Ответы покупателям проходят модерацию перед
        публикацией.
      </p>

      <ul className={`flex-column ${classes.list}`}>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <SellerReviewItem
              key={review.id}
              review={review}
              onReply={handleReply}
              replying={replyingId === review.id}
            />
          ))
        ) : !loading ? (
          <p className="text-body xl text-neutral-1000">
            Пока нет отзывов по вашим товарам
          </p>
        ) : null}
      </ul>

      {hasMore && (
        <Button
          typeButton="gray"
          radius={16}
          onClick={() => void loadMore()}
          disabled={loadingMore}
        >
          {loadingMore ? "Загрузка…" : "Показать ещё"}
        </Button>
      )}
    </ProfileContentContainer>
  );
}
