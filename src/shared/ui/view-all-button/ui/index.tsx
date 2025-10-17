"use client";
import React from "react";

import classes from "./view-all-button.module.scss";
import ArrowRightShort from "~/public/shared/arrow-right-short.svg";
import Button from "~/src/shared/ui/button";

interface Props {
  categoryId: number;
}

export default function ViewAllButton({ categoryId }: Props) {
  return (
    <Button
      typeButton="bg-gray"
      size="6-10"
      className={classes.container}
      as={"a"}
      href={`/catalogue?category_id=${encodeURIComponent(categoryId)}`}
    >
      <div className="flex-row align-center gap-1">
        <span className="gray-2 text-16 regular second-family nowrap-text">
          Смотреть все
        </span>
        <ArrowRightShort />
      </div>
    </Button>
  );
}
