"use client";
import React, { Dispatch, SetStateAction } from "react";

import classes from "./pagination.module.scss";
import Button from "~/src/shared/ui/button";
import Container from "~/src/shared/ui/container/ui";

interface Props {
  slidesCount: number;
  currentSlide: number;
  goTo: (index: number) => void;
}

export default function AdvsBannerPagination({
  slidesCount,
  currentSlide,
  goTo,
}: Props) {
  const buttons = new Array(slidesCount).fill("");

  return (
    <Container
      bgColor={null}
      className={`absolute ${classes.container} flex-row gap-2 align-center`}
    >
      {buttons.map((_, index) => {
        return (
          <Button
            typeButton="white"
            size="0"
            onClick={() => {
              goTo(index);
            }}
            className={`${classes.button} ${index === currentSlide ? classes.active : ""}`}
            needActiveScale={false}
            key={index}
          />
        );
      })}
    </Container>
  );
}
