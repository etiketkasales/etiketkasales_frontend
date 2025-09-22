"use client";
import React, { Dispatch, SetStateAction } from "react";

import classes from "./buttons.module.scss";
import ChevronCompactLeft from "~/public/adv/chevron-compact-left.svg";
import ChevronCompactRight from "~/public/adv/chevron-compact-right.svg";
import Button from "~/src/shared/ui/button";

interface Props {
  setCurrentSlide: Dispatch<SetStateAction<number>>;
  currentSlide: number;
  last: boolean;
  first: boolean;
}

export default function AdvsBannerButtons({
  currentSlide,
  setCurrentSlide,
  last,
  first,
}: Props) {
  return (
    <>
      {!first && (
        <Button
          typeButton="ghost"
          size="6"
          className={`${classes.button} ${classes.prev}`}
          onClick={() => setCurrentSlide(currentSlide - 1)}
          radius={12}
        >
          <ChevronCompactLeft />
        </Button>
      )}
      {!last && (
        <Button
          typeButton="ghost"
          size="6"
          className={`${classes.button} ${classes.next}`}
          onClick={() => setCurrentSlide(currentSlide + 1)}
          radius={12}
        >
          <ChevronCompactRight />
        </Button>
      )}
    </>
  );
}
