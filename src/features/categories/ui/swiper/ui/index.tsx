"use client";
import React, { Suspense } from "react";
import classNames from "classnames";
import { useSwiperSlides } from "~/src/shared/lib/hooks/useSwiperSlides.hook";
import { useCategoriesSwiper } from "~/src/features/categories/lib/hooks/useCategoriesSwiper.hook";

import "swiper/css";
import classes from "./categories-swiper.module.scss";
import CategoriesSwiperButtons from "./buttons";
import CategoriesCustomSwiper from "./swiper";
import Container from "~/src/shared/ui/container/ui";
import { CategorySwiperT } from "~/src/features/categories/model/categories.interface";

interface Props {
  title: string;
  type: CategorySwiperT;
  className?: string;
}

export default function CategoriesSwiper({ title, type, className }: Props) {
  const { categories, loading, error } = useCategoriesSwiper();
  const { goPrev, goNext, swiperRef, handleSlideChange } = useSwiperSlides({
    slidesCount: categories.length,
  });

  return (
    <Suspense>
      <Container
        as="section"
        className={classNames(
          `wrapper flex-column`,
          classes.container,
          className,
        )}
      >
        <div className="flex-row space-between gap-6 align-center">
          <p className="text-neutral-1000 heading h6">{title}</p>
          <CategoriesSwiperButtons goPrev={goPrev} goNext={goNext} />
        </div>
        <CategoriesCustomSwiper
          swiperRef={swiperRef}
          handleSlideChange={handleSlideChange}
          categories={categories}
          loading={loading}
          type={type}
        />
      </Container>
    </Suspense>
  );
}
