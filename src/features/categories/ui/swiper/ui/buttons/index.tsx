"use client";
import React, { Dispatch, SetStateAction } from "react";

import ChevronCompactLeft from "~/public/categories/chevron-compact-left.svg";
import ChevronCompactRight from "~/public/categories/chevron-compact-right.svg";
import Button from "~/src/shared/ui/button";
import { SimpleIconButton } from "~/src/shared/model/shared.interface";

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
    <div className="flex-row gap-3 align-center">
      {buttons.map((item, index) => {
        return (
          <Button
            key={index}
            typeButton="bg-gray"
            size="6-10"
            onClick={item.onClick}
          >
            <item.Icon style={{ width: "22px", height: "22px" }} />
          </Button>
        );
      })}
    </div>
  );
}
