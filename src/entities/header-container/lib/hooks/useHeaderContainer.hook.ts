import { useEffect, useRef, useState } from "react";
import { useWindowScroll } from "react-use";

interface Props {
  heightRef: React.RefObject<HTMLDivElement | null>;
  needTranslate: boolean;
}

const MIN_SCROLL_DIFF = 100;

export const useHeaderContainer = ({ heightRef, needTranslate }: Props) => {
  const { y } = useWindowScroll();
  const lastScrollY = useRef<number>(0);
  const [translated, setTranslated] = useState<boolean>(false);

  useEffect(() => {
    if (!needTranslate) return;
    const scrollDiff = y - lastScrollY.current;

    if (scrollDiff > MIN_SCROLL_DIFF) {
      setTranslated(true);
      lastScrollY.current = y;
    }

    if (scrollDiff < -MIN_SCROLL_DIFF) {
      setTranslated(false);
      lastScrollY.current = y;
    }
  }, [y, heightRef, needTranslate]);

  return {
    translated,
  };
};
