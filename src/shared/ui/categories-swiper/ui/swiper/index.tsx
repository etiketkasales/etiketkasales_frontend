"use client";
import React, { useRef } from "react";
import SwiperCore from "swiper";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useWindowSize } from "react-use";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectNavigation } from "~/src/app/store/reducers/navigation.slice";

import classes from "./swiper.module.scss";
import Gradient from "~/public/categories/gradient.svg";
import GradientMedia from "~/public/categories/gradient-media.svg";
import CategoryItem from "./item";
import ItemSkeleton from "./item-skeleton";
import { CategoryItemInterface } from "../../model/categories.interface";
import { categoryAll } from "../../model/categories.const";

interface Props {
  swiperRef: React.RefObject<SwiperCore | null>;
  handleSlideChange: () => void;
  categories: CategoryItemInterface[];
  loading: boolean;
}

export default function CategoriesCustomSwiper({
  swiperRef,
  handleSlideChange,
  categories,
  loading,
}: Props) {
  const { width } = useWindowSize();
  const { loaded } = useAppSelector(selectNavigation);
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
      {!loading && loaded && (
        <SwiperSlide className={classes.slide} style={{ width: "max-content" }}>
          {categories.length ? (
            <CategoryItem item={categoryAll} />
          ) : (
            <p
              className={`text-16 semibold black second-family ${classes.no_data}`}
            >
              Не удалось получить категории, перезагрузите страницу
            </p>
          )}
        </SwiperSlide>
      )}
      {loading || !loaded
        ? skeletons.map((_, index) => {
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
        : categories
          ? categories.map((item, index) => {
              return (
                <SwiperSlide
                  key={index}
                  className={classes.slide}
                  style={{ width: "max-content" }}
                >
                  <CategoryItem item={item} />
                </SwiperSlide>
              );
            })
          : null}
      {width > 460 && categories ? (
        <Gradient ref={gradientRef} className={classes.gradient} />
      ) : (
        <GradientMedia ref={gradientRef} className={classes.gradient} />
      )}
    </Swiper>
  );
}
