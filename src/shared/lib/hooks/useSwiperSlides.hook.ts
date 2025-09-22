import { useCallback, useEffect, useReducer, useRef, useState } from "react";
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
      setCurrentSlide(swiperRef.current.activeIndex);
    }
  }, []);

  useEffect(() => {
    if (!swiperRef.current) return;
    if (currentSlide >= slidesCount - 1) {
      setCurrentSlide(slidesCount - 1);
      setLast(true);
    } else {
      setLast(false);
    }
    if (currentSlide <= 0) {
      setCurrentSlide(0);
      setFirst(true);
    } else {
      setFirst(false);
    }
    swiperRef.current.slideTo(currentSlide);
  }, [currentSlide, slidesCount]);

  return {
    swiperRef,
    handleSlideChange,
    currentSlide,
    setCurrentSlide,
    first,
    last,
  };
};
