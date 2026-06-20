"use client";

import { useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import classNames from "classnames";
import StarIcon from "~/public/seller-info/star-fill.svg";

import classes from "../seller-reviews.module.scss";
import Button from "~/src/shared/ui/button";
import TextAreaInput from "~/src/shared/ui/inputs/textarea-input";
import ImageWrapper from "~/src/shared/ui/image-wrapper/ui";
import {
  ISellerReview,
  SellerReplyStatus,
  SellerReviewModerationStatus,
} from "~/src/entities/profile-section/model/seller-reviews";

const REVIEW_STATUS: Record<
  SellerReviewModerationStatus,
  { label: string; className: string }
> = {
  pending: { label: "На модерации", className: classes.badgePending },
  approved: { label: "Опубликован", className: classes.badgeApproved },
  rejected: { label: "Отклонён", className: classes.badgeRejected },
  hidden: { label: "Скрыт", className: classes.badgeHidden },
};

const REPLY_STATUS: Record<
  SellerReplyStatus,
  { label: string; className: string }
> = {
  none: { label: "", className: "" },
  pending: { label: "Ответ на модерации", className: classes.badgePending },
  approved: { label: "Ответ опубликован", className: classes.badgeApproved },
  hidden: { label: "Ответ скрыт", className: classes.badgeHidden },
};

function ReviewStars({ rating }: { rating: number }) {
  return (
    <div className={`flex-row align-center ${classes.stars}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          key={star}
          className={classNames({ [classes.starMuted]: star > rating })}
        />
      ))}
    </div>
  );
}

function StatusBadge({
  label,
  className,
}: {
  label: string;
  className: string;
}) {
  if (!label) return null;
  return <span className={classNames(classes.badge, className)}>{label}</span>;
}

interface Props {
  review: ISellerReview;
  onReply: (reviewId: number, text: string) => Promise<string>;
  replying: boolean;
}

export default function SellerReviewItem({ review, onReply, replying }: Props) {
  const [draft, setDraft] = useState(review.seller_reply ?? "");
  const [error, setError] = useState<string | null>(null);

  const mod = REVIEW_STATUS[review.moderation_status] ?? {
    label: review.moderation_status,
    className: classes.badgeHidden,
  };
  const replyStatus = (review.seller_reply_status ??
    "none") as SellerReplyStatus;
  const replyMeta = REPLY_STATUS[replyStatus] ?? REPLY_STATUS.none;
  const photos = Array.isArray(review.photos) ? review.photos : [];
  const canEditReply =
    replyStatus === "none" || replyStatus === "hidden" || !review.seller_reply;
  const showForm = canEditReply && replyStatus !== "pending";

  const onSubmit = async () => {
    const text = draft.trim();
    if (!text) {
      setError("Введите текст ответа");
      return;
    }
    setError(null);
    try {
      const msg = await onReply(review.id, text);
      setDraft("");
      setError(null);
      return msg;
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setError(
        axiosErr.response?.data?.message || "Не удалось отправить ответ",
      );
    }
  };

  return (
    <li className={`flex-column ${classes.card}`}>
      <div className={`flex-row align-center ${classes.meta}`}>
        <ReviewStars rating={review.rating} />
        <StatusBadge label={mod.label} className={mod.className} />
        {replyMeta.label && (
          <StatusBadge
            label={replyMeta.label}
            className={replyMeta.className}
          />
        )}
        <span className="text-body s text-neutral-600">
          {dayjs(review.created_at).format("DD.MM.YYYY HH:mm")}
        </span>
      </div>

      {review.product_name && (
        <p className="text-body m text-neutral-1000">
          <Link
            href={`/etiketka/p/${review.product_id}`}
            className={classes.productLink}
          >
            {review.product_name}
          </Link>
        </p>
      )}

      <p className="text-body s text-neutral-700">
        {review.user_name || "Покупатель"}
      </p>

      {review.title && (
        <p className="text-16 semibold second-family">{review.title}</p>
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
        <div className={`flex-row ${classes.photos}`}>
          {photos.map((p, i) => (
            <ImageWrapper
              key={i}
              src={p.url}
              width={64}
              height={64}
              alt=""
              className={classes.photo}
            />
          ))}
        </div>
      )}

      {review.seller_reply && replyStatus !== "none" && (
        <div className={`flex-column ${classes.replyBlock}`}>
          <span className="text-14 semibold second-family">Ваш ответ</span>
          <p className="text-14 regular second-family gray-2">
            {review.seller_reply}
          </p>
        </div>
      )}

      {replyStatus === "pending" && (
        <p className="text-body s text-neutral-700">
          Ответ проверяется модератором и появится на сайте после одобрения.
        </p>
      )}

      {showForm && (
        <div className="flex-column gap-2">
          <TextAreaInput
            placeholder="Ответ покупателю"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={3}
            maxLength={4000}
            errorText={error ?? undefined}
          />
          <Button
            typeButton="yellow-200"
            radius={12}
            onClick={() => void onSubmit()}
            disabled={replying}
          >
            {replying ? "Отправка…" : "Отправить ответ"}
          </Button>
          <p className="text-body s text-neutral-600">
            Ответ проходит модерацию перед публикацией на карточке товара.
          </p>
        </div>
      )}
    </li>
  );
}
