import { useEffect, useRef, useState } from "react";
import { useWindowScroll, useWindowSize } from "react-use";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectNavigation } from "~/src/app/store/reducers/navigation.slice";

export const useHeaderScroll = () => {
  const { width } = useWindowSize();
  const { y } = useWindowScroll();
  const { headerHeight: height } = useAppSelector(selectNavigation);
  const prevScroll = useRef<number>(0);
  const [visible, setVisible] = useState<boolean>(true);
  const [delay, setDelay] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollDiff = y - prevScroll.current;
      if (Math.abs(scrollDiff) > height / 2) {
        setDelay(true);
        if (scrollDiff > 0) {
          setVisible(false);
        } else {
          setVisible(true);
        }
        prevScroll.current = y;
      }
      setTimeout(() => {
        setDelay(false);
      }, 510);
    };
    if (!delay) handleScroll();
  }, [y, height, delay, width]);

  return { visible, width };
};
