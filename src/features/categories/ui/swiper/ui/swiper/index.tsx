"use client";
import React, { CSSProperties, useRef } from "react";
import classNames from "classnames";
import { useWindowSize } from "react-use";
import SwiperCore from "swiper";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import classes from "./swiper.module.scss";
import Gradient from "~/public/categories/gradient.svg";
import GradientMedia from "~/public/categories/gradient-media.svg";
import CategoryItem from "./item";
import ItemSkeleton from "./item-skeleton";
import CategoriesSwiperNoData from "./no-data";
import AllCategories from "./all-categories";
import {
  CategorySwiperT,
  ICategory,
} from "~/src/features/categories/model/categories.interface";

interface Props {
  swiperRef: React.RefObject<SwiperCore | null>;
  handleSlideChange: () => void;
  categories: ICategory[];
  loading: boolean;
  type: CategorySwiperT;
}

interface ISlideConfig {
  style: CSSProperties;
  className: string;
}

const sharedSlideConfig: ISlideConfig = {
  style: { width: "max-content" },
  className: classes.slide,
};

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
      <SwiperSlide
        {...sharedSlideConfig}
        className={classNames(classes.firstSlide, classes.slide)}
      >
        <AllCategories type={type} />
      </SwiperSlide>
      {loading ? (
        skeletons.map((_, index) => {
          return (
            <SwiperSlide key={index} {...sharedSlideConfig}>
              <ItemSkeleton />
            </SwiperSlide>
          );
        })
      ) : Array.isArray(categories) ? (
        categories.map((item, index) => {
          return (
            <SwiperSlide
              key={index}
              {...sharedSlideConfig}
              className={classes.slide}
              style={
                {
                  "--order": item.sort_order || 1,
                } as CSSProperties
              }
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
