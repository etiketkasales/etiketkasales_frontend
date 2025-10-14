import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import React from "react";

import { useAppSelector } from "~/src/app/store/hooks";
import { selectNavigation } from "~/src/app/store/reducers/navigation.slice";
import { useSwiperSlides } from "~/src/shared/lib/hooks/useSwiperSlides.hook";
import { useAdvs } from "~/src/shared/ui/advs/lib/hooks/useAdvs.hook";

import classes from "./advs.module.scss";
import InfoPlain from "../info-plain";
import AddsBannerPagination from "~/src/shared/ui/advs/ui/swiper/pagination";
import SkeletonWrapper from "~/src/shared/ui/skeleton/ui";
import AdvsSwiper from "./swiper";

interface Props {
  className?: string;
}

export default function AdvsBanner({ className }: Props) {
  const { loaded } = useAppSelector(selectNavigation);
  const { advs, loading } = useAdvs();
  const { swiperRef, handleSlideChange, goTo, currentSlide } = useSwiperSlides({
    slidesCount: advs.length,
  });

  return (
    <section className="wrapper">
      <div className="relative">
        {loading || !loaded ? (
          <SkeletonWrapper className={classes.skeleton} />
        ) : (
          <>
            <AdvsSwiper
              slides={advs}
              className={className}
              swiperRef={swiperRef}
              handleSlideChange={handleSlideChange}
            />
            <AddsBannerPagination
              currentSlide={currentSlide}
              goTo={goTo}
              slidesCount={advs.length}
            />
            <InfoPlain className={classes.infoPlain} />
          </>
        )}
      </div>
    </section>
  );
}
