"use client";
import { useCallback, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAppDispatch } from "~/src/app/store/hooks";
import { setUser } from "~/src/app/store/reducers/user.slice";
import { useCart } from "~/src/features/cart/lib/hooks/useCart.hook";
import { useFiltersInit } from "~/src/features/filters/lib/hooks";
import { useUser } from "~/src/features/user/lib/hooks/useUser.hook";

export const useInitialize = () => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  useFiltersInit();
  const { handleGetUser } = useUser();
  const { updateCart } = useCart({ needInitialize: false });

  useEffect(() => {
    let remember = false;
    if (typeof window !== "undefined") {
      remember = localStorage.getItem("needRemember") === "true";
      dispatch(setUser({ needRemember: remember }));
    }
    // В админке корзина не нужна и только создает лишние /v1/cart/ запросы.
    if (!pathname.startsWith("/admin")) {
      void updateCart();
    }
    if (remember) {
      void handleGetUser({ skipCart: pathname.startsWith("/admin") });
    } else {
      dispatch(setUser({ isLoggedIn: false }));
    }
  }, [handleGetUser, dispatch, updateCart, pathname]);
};
