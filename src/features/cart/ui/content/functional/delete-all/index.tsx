"use client";
import React from "react";

import TrashCan from "~/public/cart/yellow-trash.svg";
import Button from "~/src/shared/ui/button";

interface Props {
  onClick: () => void;
}

export default function CartDeleteAll({ onClick }: Props) {
  return (
    <Button
      typeButton="ghost"
      size="0"
      onClick={() => {}}
      needActiveScale={false}
      className={`right-element`}
      justifyCenter={false}
    >
      <div className="flex-row gap-6px align-center">
        <TrashCan />
        <span className="heading h7 text-yellow-600">Удалить выбранные</span>
      </div>
    </Button>
  );
}
