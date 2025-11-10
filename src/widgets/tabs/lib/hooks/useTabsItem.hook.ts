import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import {
  selectNavigation,
  setNavigation,
} from "~/src/app/store/reducers/navigation.slice";

import { ICartItem } from "~/src/features/cart/model/cart.interface";

export const useTabsItem = (link: string, cartItems: ICartItem[]) => {
  const dispatch = useAppDispatch();
  const { push, prefetch } = useRouter();
  const { activeTabsItem } = useAppSelector(selectNavigation);

  const onTabClick = useCallback(() => {
    if (activeTabsItem === link) return;
    push(`/${link}`);
  }, [push, link, activeTabsItem]);

  useEffect(() => {
    if (!link || link === "") return;
    if (typeof window === "undefined") return;
    if (window.location.pathname.includes(link)) {
      dispatch(setNavigation({ activeTabsItem: link }));
    }
  }, [link, dispatch]);

  useEffect(() => {
    prefetch(link);
  }, [link, prefetch]);

  const getBool = (items: any[]) => {
    if (items.length > 0) {
      return true;
    }
    return false;
  };

  const getDop = (needDop: "cart" | "favourites") => {
    switch (needDop) {
      default:
      case "cart":
        return getBool(cartItems);
      case "favourites":
        return getBool(cartItems);
    }
  };

  return {
    getDop,
    isActive: activeTabsItem === link,
    onTabClick,
  };
};
