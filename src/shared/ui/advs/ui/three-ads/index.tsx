"use client";

import "swiper/css";

import { Swiper, SwiperSlide } from "swiper/react";
import { useWindowSize } from "react-use";
import { useAdvs } from "~/src/shared/ui/advs/lib/hooks/useAdvs.hook";
import { useBannerImageSrc } from "~/src/shared/ui/advs/lib/hooks/useBannerImageSrc.hook";
import { IAdv } from "~/src/shared/ui/advs/model/advs.interface";

import classes from "./three-ads.module.scss";
import SkeletonWrapper from "~/src/shared/ui/skeleton/ui";
import InfoPlain from "../info-plain";
import ImageWrapper from "../../../image-wrapper/ui";
import LinkContainer from "~/src/shared/ui/link-container/ui";

function SmallBannerCard({ item }: { item: IAdv }) {
  const src = useBannerImageSrc(item);
  const image = (
    <ImageWrapper
      src={src}
      width={399}
      height={160}
      alt={item.alt || "Рекламный баннер"}
      loading="lazy"
      className={`${classes.item} relative`}
    >
      <InfoPlain className={classes.infoPlain} needText={false} />
    </ImageWrapper>
  );

  if (!item.link) {
    return image;
  }

  return (
    <LinkContainer
      link={item.link}
      className={classes.link}
      target={
        item.link.startsWith("http://") || item.link.startsWith("https://")
          ? "_blank"
          : undefined
      }
    >
      {image}
    </LinkContainer>
  );
}

export default function ThreeAds() {
  const { advs, loading } = useAdvs("HOME_SMALL");
  const { width } = useWindowSize();
  const isNarrow = Number.isFinite(width) && width > 0 && width <= 768;

  if (!loading && advs.length === 0) {
    return null;
  }

  if (loading) {
    return (
      <div className={`template-columns-12 gap-5 ${classes.grid}`}>
        {Array.from({ length: 3 }).map((_, index) => (
          <SkeletonWrapper key={index} className={classes.item} />
        ))}
      </div>
    );
  }

  const useSlider = advs.length > 3 || isNarrow;

  if (useSlider) {
    return (
      <div className={classes.sliderWrap}>
        <Swiper
          slidesPerView={isNarrow ? 1.15 : 3}
          spaceBetween={16}
          className={classes.slider}
        >
          {advs.map((item) => (
            <SwiperSlide key={item.id} className={classes.slide}>
              <SmallBannerCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }

  return (
    <div className={`template-columns-12 gap-5 ${classes.grid}`}>
      {advs.map((item) => (
        <SmallBannerCard key={item.id} item={item} />
      ))}
    </div>
  );
}
