"use client";
import React, { useRef } from "react";
import { useWindowSize } from "react-use";
import SwiperCore from "swiper";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import classes from "./swiper.module.scss";
import Gradient from "~/public/categories/gradient.svg";
import GradientMedia from "~/public/categories/gradient-media.svg";
import CategoryItem from "./item";
import ItemSkeleton from "./item-skeleton";
import {
  CategorySwiperT,
  ICategory,
} from "~/src/features/categories/model/categories.interface";
import CategoriesSwiperNoData from "./no-data";

interface Props {
  swiperRef: React.RefObject<SwiperCore | null>;
  handleSlideChange: () => void;
  categories: ICategory[];
  loading: boolean;
  type: CategorySwiperT;
}

export default function CategoriesCustomSwiper({
  swiperRef,
  handleSlideChange,
  categories,
  loading,
  type,
}: Props) {
  const { width } = useWindowSize();
  const gradientRef = useRef<SVGSVGElement | null>(null);
  const skeletons = [...Array(12).keys()];

  return (
    <Swiper
      modules={[FreeMode]}
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
      onSlideChange={() => handleSlideChange()}
      className={`${classes.container} flex-row align-center`}
      slidesPerView={"auto"}
      freeMode={true}
      simulateTouch={true}
      allowTouchMove={true}
      touchRatio={1}
      grabCursor={true}
      style={{
        paddingRight: `${gradientRef.current?.clientWidth}px`,
      }}
    >
      {loading ? (
        skeletons.map((_, index) => {
          return (
            <SwiperSlide
              key={index}
              className={classes.slide}
              style={{ width: "max-content" }}
            >
              <ItemSkeleton />
            </SwiperSlide>
          );
        })
      ) : Array.isArray(categories) ? (
        categories.map((item, index) => {
          return (
            <SwiperSlide
              key={index}
              className={classes.slide}
              style={{ width: "max-content" }}
            >
              <CategoryItem item={item} type={type} />
            </SwiperSlide>
          );
        })
      ) : (
        <CategoriesSwiperNoData />
      )}
      {width > 460 && categories ? (
        <Gradient ref={gradientRef} className={classes.gradient} />
      ) : (
        <GradientMedia ref={gradientRef} className={classes.gradient} />
      )}
    </Swiper>
  );
}
