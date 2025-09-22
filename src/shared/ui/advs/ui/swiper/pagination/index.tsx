"use client";
import React, { Dispatch, SetStateAction } from "react";

import classes from "./pagination.module.scss";
import Button from "~/src/shared/ui/button";

interface Props {
  slidesCount: number;
  currentSlide: number;
  setCurrentSlide: Dispatch<SetStateAction<number>>;
}

export default function AdvsBannerPagination({
  slidesCount,
  currentSlide,
  setCurrentSlide,
}: Props) {
  const buttons = new Array(slidesCount).fill("");

  return (
    <section
      className={`absolute ${classes.container} flex-row gap-2 align-center`}
    >
      {buttons.map((_, index) => {
        return (
          <Button
            typeButton="ghost"
            size="0"
            onClick={() => {
              setCurrentSlide(index);
            }}
            className={`${classes.button} ${index === currentSlide ? classes.active : ""}`}
            needActiveScale={false}
            key={index}
          />
        );
      })}
    </section>
  );
}
