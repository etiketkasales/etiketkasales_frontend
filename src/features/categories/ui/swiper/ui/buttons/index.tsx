"use client";
import React from "react";

import classes from "./swiper-buttons.module.scss";
import ChevronCompactLeft from "~/public/categories/chevron-compact-left.svg";
import ChevronCompactRight from "~/public/categories/chevron-compact-right.svg";
import Button from "~/src/shared/ui/button";
import { SimpleIconButton } from "~/src/shared/model";

interface Props {
  goPrev: () => void;
  goNext: () => void;
}

export default function CategoriesSwiperButtons({ goPrev, goNext }: Props) {
  const buttons: SimpleIconButton[] = [
    {
      Icon: ChevronCompactLeft,
      onClick: goPrev,
    },
    {
      Icon: ChevronCompactRight,
      onClick: goNext,
    },
  ];

  return (
    <div className={`flex-row gap-3 align-center ${classes.container}`}>
      {buttons.map((item, index) => {
        return (
          <Button
            key={index}
            typeButton="gray"
            onClick={item.onClick}
            radius={12}
            className={classes.button}
          >
            <item.Icon style={{ width: "22px", height: "22px" }} />
          </Button>
        );
      })}
    </div>
  );
}
