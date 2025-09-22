"use client";
import React from "react";
import Button from "~/src/shared/ui/button";

interface Props {
  orderBillUrl?: string;
}

export default function ProfileOrderButton({ orderBillUrl }: Props) {
  return (
    <div>
      <Button
        typeButton={orderBillUrl ? "yellow" : "gray-1"}
        size="12-16"
        radius={12}
      >
        <span className="text-16 black second-family semibold">
          {orderBillUrl ? "Скачать счет" : "Оставить отзыв"}
        </span>
      </Button>
    </div>
  );
}
