"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import classNames from "classnames";
import StarIcon from "~/public/seller-info/star-fill.svg";

import classes from "./reviews.module.scss";
import Button from "~/src/shared/ui/button";
import TextAreaInput from "~/src/shared/ui/inputs/textarea-input";
import ImageWrapper from "~/src/shared/ui/image-wrapper/ui";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectUser } from "~/src/app/store/reducers/user.slice";
import { useCreateNotification } from "~/src/widgets/notifications/lib/hooks";
import {
  getReviewApiErrorMessage,
  useCreateProductReview,
  useProductReviews,
  useUploadReviewImage,
} from "~/src/entities/etiketka/lib/hooks/useProductReviews.hook";
import { IProductReview } from "~/src/entities/etiketka/model/reviews.interface";

interface Props {
  productId: number;
}

function ReviewStars({
  value,
  onChange,
  disabled,
}: {
  value: number;
  onChange?: (v: number) => void;
  disabled?: boolean;
}) {
  return (
    <div className={`flex-row align-center ${classes.starsInput}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={classes.starBtn}
          disabled={disabled || !onChange}
          onClick={() => onChange?.(star)}
          aria-label={`Оценка ${star}`}
        >
          <StarIcon
            className={classNames({
              [classes.starInactive]: star > value,
            })}
          />
        </button>
      ))}
    </div>
  );
}

function ReviewItem({ review }: { review: IProductReview }) {
  const photos = Array.isArray(review.photos) ? review.photos : [];

  return (
    <article className={`flex-column ${classes.reviewCard}`}>
      <div className="flex-row align-center gap-2 flex-wrap">
        <ReviewStars value={review.rating} disabled />
        <span className="text-body s text-neutral-700">
          {review.user_name || "Покупатель"}
        </span>
        <span className="text-body s text-neutral-600">
          {dayjs(review.created_at).format("DD.MM.YYYY")}
        </span>
        {review.is_verified && (
          <span className={classes.verified}>Покупка подтверждена</span>
        )}
      </div>
      {review.title && (
        <p className="text-16 semibold second-family black">{review.title}</p>
      )}
      {review.comment && (
        <p className="text-16 regular second-family gray-2">{review.comment}</p>
      )}
      {review.pros && (
        <p className="text-14 regular second-family">
          <span className="semibold">Плюсы: </span>
          {review.pros}
        </p>
      )}
      {review.cons && (
        <p className="text-14 regular second-family">
          <span className="semibold">Минусы: </span>
          {review.cons}
        </p>
      )}
      {photos.length > 0 && (
        <div className={`flex-row ${classes.reviewPhotos}`}>
          {photos.map((p, i) => (
            <ImageWrapper
              key={i}
              src={p.url}
              width={72}
              height={72}
              alt=""
              className={classes.photoThumb}
            />
          ))}
        </div>
      )}
      {review.seller_reply && (
        <div className={`flex-column ${classes.sellerReply}`}>
          <span className="text-14 semibold second-family">Ответ продавца</span>
          <p className="text-14 regular second-family gray-2">
            {review.seller_reply}
          </p>
        </div>
      )}
    </article>
  );
}

export default function EtiketkaReviews({ productId }: Props) {
  const { isLoggedIn } = useAppSelector(selectUser);
  const createNotification = useCreateNotification();
  const fileRef = useRef<HTMLInputElement>(null);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const reviewsQuery = useProductReviews(productId);
  const createReview = useCreateProductReview(productId);
  const uploadImage = useUploadReviewImage();

  const firstPage = reviewsQuery.data?.pages[0];
  const summary = firstPage?.summary;
  const items = reviewsQuery.data?.pages.flatMap((p) => p?.items ?? []) ?? [];

  const onPickPhotos = useCallback(
    async (files: FileList | null) => {
      if (!files?.length) return;
      const remaining = 5 - photoUrls.length;
      if (remaining <= 0) {
        createNotification("Не более 5 фото", "error");
        return;
      }
      const slice = Array.from(files).slice(0, remaining);
      for (const file of slice) {
        try {
          const data = await uploadImage.mutateAsync(file);
          if (data?.url) {
            setPhotoUrls((prev) => [...prev, data.url]);
          }
        } catch (err) {
          createNotification(getReviewApiErrorMessage(err), "error");
        }
      }
    },
    [photoUrls.length, uploadImage, createNotification],
  );

  const onSubmit = async () => {
    if (rating < 1) {
      createNotification("Выберите оценку от 1 до 5", "error");
      return;
    }
    try {
      const data = await createReview.mutateAsync({
        rating,
        comment: comment.trim() || undefined,
        photos: photoUrls.map((url) => ({ url })),
      });
      setSubmitted(true);
      setRating(0);
      setComment("");
      setPhotoUrls([]);
      createNotification(
        data?.message || "Отзыв отправлен на модерацию",
        "success",
      );
    } catch (err) {
      createNotification(getReviewApiErrorMessage(err), "error");
    }
  };

  const avgLabel =
    summary?.avg_rating != null
      ? summary.avg_rating.toFixed(1).replace(".", ",")
      : "—";

  return (
    <div className={`flex-column ${classes.container}`}>
      <div className={`flex-column ${classes.summary}`}>
        <h2 className="text-18 black second-family semibold">Отзывы</h2>
        <div className="flex-row align-center gap-2">
          <StarIcon />
          <span className="text-18 semibold second-family">{avgLabel}</span>
          <span className="text-body m text-neutral-700">
            {summary?.total ?? 0}{" "}
            {(summary?.total ?? 0) === 1
              ? "отзыв"
              : (summary?.total ?? 0) >= 2 && (summary?.total ?? 0) <= 4
                ? "отзыва"
                : "отзывов"}
          </span>
        </div>
      </div>

      {!submitted && (
        <div className={`flex-column ${classes.form}`}>
          <p className={`text-16 regular second-family ${classes.hint}`}>
            Оставить отзыв могут покупатели после доставки заказа. Отзыв
            проходит модерацию перед публикацией.
          </p>
          {!isLoggedIn ? (
            <p className="text-16 regular second-family">
              <Link href="/login" className="text-blue-500 underline">
                Войдите
              </Link>
              , чтобы оставить отзыв.
            </p>
          ) : (
            <>
              <div className="flex-column gap-2">
                <span className="text-16 semibold second-family">
                  Ваша оценка
                </span>
                <ReviewStars value={rating} onChange={setRating} />
              </div>
              <TextAreaInput
                placeholder="Комментарий (необязательно)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                maxLength={4000}
              />
              <div className={`flex-row align-center ${classes.photoRow}`}>
                {photoUrls.map((url, i) => (
                  <div key={url} className={classes.photoThumb}>
                    <ImageWrapper src={url} width={72} height={72} alt="" />
                    <button
                      type="button"
                      className={classes.removePhoto}
                      aria-label="Удалить фото"
                      onClick={() =>
                        setPhotoUrls((prev) =>
                          prev.filter((_, idx) => idx !== i),
                        )
                      }
                    >
                      ×
                    </button>
                  </div>
                ))}
                {photoUrls.length < 5 && (
                  <Button
                    typeButton="gray"
                    radius={12}
                    onClick={() => fileRef.current?.click()}
                    disabled={uploadImage.isPending}
                  >
                    {uploadImage.isPending ? "Загрузка…" : "Добавить фото"}
                  </Button>
                )}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                hidden
                onChange={(e) => {
                  void onPickPhotos(e.target.files);
                  e.target.value = "";
                }}
              />
              <Button
                typeButton="yellow-200"
                radius={16}
                onClick={() => void onSubmit()}
                disabled={createReview.isPending || rating < 1}
              >
                {createReview.isPending ? "Отправка…" : "Отправить отзыв"}
              </Button>
            </>
          )}
        </div>
      )}

      {submitted && (
        <p className={`text-16 regular second-family ${classes.hint}`}>
          Спасибо! Ваш отзыв на модерации и появится в списке после одобрения.
        </p>
      )}

      {reviewsQuery.isLoading && (
        <p className={`text-16 regular second-family ${classes.empty}`}>
          Загрузка отзывов…
        </p>
      )}

      {!reviewsQuery.isLoading && items.length === 0 && (
        <p className={`text-16 regular second-family ${classes.empty}`}>
          Пока нет опубликованных отзывов.
        </p>
      )}

      {items.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}

      {reviewsQuery.hasNextPage && (
        <Button
          typeButton="gray"
          radius={16}
          onClick={() => void reviewsQuery.fetchNextPage()}
          disabled={reviewsQuery.isFetchingNextPage}
        >
          {reviewsQuery.isFetchingNextPage ? "Загрузка…" : "Показать ещё"}
        </Button>
      )}
    </div>
  );
}
