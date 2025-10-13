"use client";
import React from "react";

import classes from "./delete-all.module.scss";
import TrashCan from "~/public/cart/trash2-fill.svg";
import Button from "~/src/shared/ui/button";

export default function CartDeleteAll() {
  return (
    <Button
      typeButton="ghost"
      size="0"
      onClick={() => {}}
      needActiveScale={false}
      className={`${classes.button} right-element`}
      justifyCenter={false}
    >
      <div className="flex-row gap-6px align-center">
        <TrashCan />
        <span className="text-16 second-family gray-2 regular">
          Удалить выбранные
        </span>
      </div>
    </Button>
  );
}
