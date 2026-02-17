import classNames from "classnames";

import classes from "./adv-swiper.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import AdvsSlide from "./slide";
import SwiperCore from "swiper";
import { advsSwiperConfig } from "~/src/shared/ui/advs/model/swiper.config";
import { IAdv } from "~/src/shared/ui/advs/model/advs.interface";

interface Props {
  slides: IAdv[];
  handleSlideChange: () => void;
  swiperRef: React.RefObject<SwiperCore | null>;
  className?: string;
}

export default function AdvsSwiper({
  slides,
  handleSlideChange,
  swiperRef,
  className,
}: Props) {
  return (
    <Swiper
      modules={[Autoplay]}
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
      onSlideChange={() => handleSlideChange()}
      className={classNames(
        `flex-row align-center radius-20`,
        classes.swiper,
        className,
      )}
      {...advsSwiperConfig}
    >
      {slides.map((item, index) => (
        <SwiperSlide key={index + item.link}>
          <AdvsSlide {...item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
