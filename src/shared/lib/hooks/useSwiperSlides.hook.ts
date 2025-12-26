"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import SwiperCore from "swiper";

interface Props {
  slidesCount: number;
}

export const useSwiperSlides = ({ slidesCount }: Props) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [last, setLast] = useState<boolean>(false);
  const [first, setFirst] = useState<boolean>(false);
  const swiperRef = useRef<SwiperCore | null>(null);

  const handleSlideChange = useCallback(() => {
    if (swiperRef.current) {
      const idx = swiperRef.current.realIndex ?? swiperRef.current.activeIndex;
      setCurrentSlide(idx);
    }
  }, []);

  const goNext = useCallback(() => {
    if (swiperRef.current && !last) {
      swiperRef.current.slideNext();
    }
  }, [last]);

  const goPrev = useCallback(() => {
    if (swiperRef.current && !first) {
      swiperRef.current.slidePrev();
    }
  }, [first]);

  const goTo = useCallback(
    (index: number) => {
      if (swiperRef.current && index >= 0 && index < slidesCount) {
        swiperRef.current.slideToLoop(index);
      }
    },
    [slidesCount],
  );

  useEffect(() => {
    setFirst(currentSlide === 0);
    setLast(currentSlide === slidesCount - 1);
  }, [currentSlide, slidesCount]);

  return {
    swiperRef,
    handleSlideChange,
    currentSlide,
    setCurrentSlide,
    first,
    last,
    goTo,
    goPrev,
    goNext,
  };
};
