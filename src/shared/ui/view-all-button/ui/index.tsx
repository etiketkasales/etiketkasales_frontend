"use client";
import React from "react";
import { useRouter } from "next/navigation";

import classes from "./view-all-button.module.scss";
import ArrowRightShort from "~/public/shared/arrow-right-short.svg";
import Button from "~/src/shared/ui/button";

export default function ViewAllButton() {
  const { push } = useRouter();
  return (
    <Button
      typeButton="bg-gray"
      size="6-10"
      onClick={() => push("/")}
      className={classes.container}
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
