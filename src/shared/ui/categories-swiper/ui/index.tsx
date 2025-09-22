"use client";
import "swiper/css";
import React, { useEffect, useState } from "react";
import { useSwiperSlides } from "~/src/shared/lib/hooks/useSwiperSlides.hook";
import { useCategories } from "../lib/hooks/useCategories.hook";

import classes from "./categories-swiper.module.scss";
import CategoriesSwiperButtons from "./buttons";
import CategoriesCustomSwiper from "./swiper";

interface Props {
  title: string;
}

export default function CategoriesSwiper({ title }: Props) {
  const { categories, loading } = useCategories();
  const { currentSlide, setCurrentSlide, swiperRef, handleSlideChange } =
    useSwiperSlides({ slidesCount: categories.length });
  const [maxSlides, setMaxSlides] = useState<number>(8);

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper) return;
    const ITEM_WIDTH = 116;
    const width = swiper.width;
    const slides = swiper.slides.length;

    const maxSlides = slides - Math.floor(width / ITEM_WIDTH);
    setMaxSlides(maxSlides);
  }, []);

  return (
    <section
      className={`wrapper section-wrapper flex-column gap-7 ${classes.container}`}
    >
      <div className="flex-row space-between gap-6 align-center">
        <p className="text-18 black bold second-family">{title}</p>
        <CategoriesSwiperButtons
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
          maxSlides={maxSlides}
        />
      </div>
      <CategoriesCustomSwiper
        swiperRef={swiperRef}
        handleSlideChange={handleSlideChange}
        categories={categories}
        loading={loading}
      />
    </section>
  );
}
