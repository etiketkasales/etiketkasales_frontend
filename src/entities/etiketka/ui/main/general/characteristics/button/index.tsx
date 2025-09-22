"use client";
import React, { Dispatch, SetStateAction } from "react";

import classes from "./button.module.scss";
import Button from "~/src/shared/ui/button";

interface Props {
  viewAll: boolean;
  setViewAll: Dispatch<SetStateAction<boolean>>;
}

export default function CharacteristicsButton({ viewAll, setViewAll }: Props) {
  return (
    <div>
      <Button
        typeButton="ghost"
        size="0"
        onClick={() => setViewAll(!viewAll)}
        needActiveScale={false}
      >
        <span
          className={`text-16 second-family dark-yellow semibold ${classes.text}`}
        >
          {!viewAll ? "Все характеристики" : "Скрыть"}
        </span>
      </Button>
    </div>
  );
}
