"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useWindowSize } from "react-use";
import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import {
  selectNavigation,
  setNavigation,
} from "~/src/app/store/reducers/navigation.slice";
import { useHeaderScroll } from "../lib/hooks/useHeaderScroll.hook";

import classes from "./header.module.scss";
import HeaderTop from "./top";
import HeaderBottom from "./bottom";
import CartFunctional from "~/src/features/cart/ui/content/functional";

// TO DO: переделать хедер. Сделать его универсальным, без всех этих тернарников

export default function Header() {
  const dispatch = useAppDispatch();
  const { width } = useWindowSize();
  const { headerHeight } = useAppSelector(selectNavigation);
  const { visible } = useHeaderScroll(width);
  const [isCartPage, setIsCartPage] = React.useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const path = window.location.pathname;
    if (path.includes("cart")) {
      setIsCartPage(true);
    }
  }, []);

  useEffect(() => {
    if (isCartPage && width <= 768) {
      dispatch(setNavigation({ headerHeight: ref.current?.scrollHeight || 0 }));
    }
  }, [isCartPage, width, dispatch]);

  return (
    <header className={`header-container`}>
      <motion.div
        initial={{
          transform: "translateY(0)",
        }}
        animate={{
          transform: visible
            ? "translateY(0)"
            : `translateY(-${headerHeight}px)`,
        }}
        transition={{ duration: 0.3 }}
        className={`flex-column wrapper-header ${isCartPage && width <= 768 ? classes.cart : ""}`}
        style={{ willChange: "transform" }}
      >
        {isCartPage && width <= 768 ? (
          <div className="flex-column gap-5" ref={ref}>
            <h1 className="size-18 bold second-family text-center black">
              Корзина
            </h1>
            <CartFunctional />
          </div>
        ) : (
          <>
            {width > 768 ? <HeaderTop /> : null}
            <HeaderBottom isCartPage={isCartPage} />
          </>
        )}
      </motion.div>
    </header>
  );
}
