"use client";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useWindowSize } from "react-use";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectNavigation } from "~/src/app/store/reducers/navigation.slice";
import { useSwiperSlides } from "~/src/shared/lib/hooks/useSwiperSlides.hook";
import { useAdvs } from "~/src/shared/ui/advs/lib/hooks/useAdvs.hook";

import classes from "./advs.module.scss";
import AddsBannerButtons from "./buttons";
import InfoPlain from "./info-plain";
import ImageContainer from "~/src/shared/ui/image-container";
import AddsBannerPagination from "~/src/shared/ui/advs/ui/swiper/pagination";
import SkeletonWrapper from "~/src/shared/ui/skeleton/ui";
import Link from "next/link";

interface Props {
  className?: string;
}

export default function AdvsBanner({ className }: Props) {
  const { width } = useWindowSize();
  const { loaded } = useAppSelector(selectNavigation);
  const slides = ["Slide 1", "Slide 2", "Slide 3", "Slide 4", "Slide 5"];
  const { advs, loading } = useAdvs();
  const {
    swiperRef,
    handleSlideChange,
    setCurrentSlide,
    currentSlide,
    last,
    first,
  } = useSwiperSlides({ slidesCount: (advs || slides).length });

  return (
    <section className="wrapper">
      <div className="relative">
        {loading || !loaded ? (
          <SkeletonWrapper className={classes.skeleton} />
        ) : (
          <>
            <Swiper
              modules={[Autoplay, Pagination]}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={() => handleSlideChange()}
              className={`${classes.swiper} ${className} flex-row align-center radius-20`}
              slidesPerView={1}
              spaceBetween={0}
              autoplay={{
                delay: 10000,
                disableOnInteraction: true,
              }}
              simulateTouch={true}
              allowTouchMove={true}
              touchRatio={1}
              grabCursor={true}
            >
              {advs
                ? advs.map((item, index) => {
                    return (
                      <SwiperSlide key={`${index}-${item.id}`}>
                        {item.link && (
                          <Link
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={classes.link}
                          />
                        )}
                        <ImageContainer
                          src={item.image_url}
                          width={1240}
                          height={width <= 360 ? 200 : 400}
                          alt="Рекламный баннер"
                        />
                      </SwiperSlide>
                    );
                  })
                : slides.map((_, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <ImageContainer
                          src={
                            width > 460
                              ? `/shared/no-add-banner.png`
                              : `/shared/no-add-banner-328px.png`
                          }
                          width={1240}
                          height={width <= 360 ? 200 : 400}
                          alt="Рекламный баннер"
                        />
                      </SwiperSlide>
                    );
                  })}
            </Swiper>
            {width >= 768 ? (
              <AddsBannerButtons
                setCurrentSlide={setCurrentSlide}
                currentSlide={currentSlide}
                last={last}
                first={first}
              />
            ) : (
              <AddsBannerPagination
                currentSlide={currentSlide}
                setCurrentSlide={setCurrentSlide}
                slidesCount={(advs || slides).length}
              />
            )}
            <InfoPlain />
          </>
        )}
      </div>
    </section>
  );
}
