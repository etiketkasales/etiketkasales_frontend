import { useCallback, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import { selectCart } from "~/src/app/store/reducers/cart.slice";
import { setNavigation } from "~/src/app/store/reducers/navigation.slice";

export const useTabs = () => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const { items } = useAppSelector(selectCart);

  const setHeight = useCallback(
    (height: number | null) => {
      dispatch(
        setNavigation({
          tabsHeight: height,
        }),
      );
    },
    [dispatch],
  );

  useEffect(() => {
    if (!ref.current) return;
    setHeight(ref.current.scrollHeight);
    return () => setHeight(null);
  }, [dispatch, setHeight]);

  return {
    ref,
    cartItems: items,
  };
};
