"use client";
import React, { Dispatch, SetStateAction } from "react";

import ChevronCompactLeft from "~/public/categories/chevron-compact-left.svg";
import ChevronCompactRight from "~/public/categories/chevron-compact-right.svg";
import Button from "~/src/shared/ui/button";
import { SimpleIconButton } from "~/src/shared/model/shared.interface";

interface Props {
  currentSlide: number;
  setCurrentSlide: Dispatch<SetStateAction<number>>;
  maxSlides: number;
}

export default function CategoriesSwiperButtons({
  currentSlide,
  setCurrentSlide,
  maxSlides,
}: Props) {
  const buttons: SimpleIconButton[] = [
    {
      Icon: ChevronCompactLeft,
      onClick: () => {
        setCurrentSlide(currentSlide - 1);
      },
    },
    {
      Icon: ChevronCompactRight,
      onClick: () => {
        if (currentSlide > maxSlides) return;
        setCurrentSlide(currentSlide + 1);
      },
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
