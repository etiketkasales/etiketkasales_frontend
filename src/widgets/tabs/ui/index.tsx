"use client";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { useWindowSize } from "react-use";
import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import { setNavigation } from "~/src/app/store/reducers/navigation.slice";
import { selectFavourites } from "~/src/app/store/reducers/favourites.slice";
import { selectCart } from "~/src/app/store/reducers/cart.slice";

import classes from "./tabs.module.scss";
import TabsList from "./list";
import AddEtiketkaButton from "~/src/shared/ui/add-etiketka-button/ui";

interface Props {
  TabsButton?: ReactNode;
}

export default function Tabs({ TabsButton }: Props) {
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector(selectCart);
  const { favouriteItems } = useAppSelector(selectFavourites);

  const ref = useRef<HTMLDivElement>(null);
  const { width } = useWindowSize();
  const [isEtiketkaPage, setIsEtiketkaPage] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.pathname.includes("etiketka")) {
      setIsEtiketkaPage(true);
    }
  }, []);

  useEffect(() => {
    if (ref.current) {
      dispatch(
        setNavigation({
          tabsHeight: ref.current.scrollHeight,
        }),
      );
    }
    return () => {
      dispatch(
        setNavigation({
          tabsHeight: null,
        }),
      );
    };
  }, [dispatch]);

  const getPadding = () => {
    if (cartItems.length > 0 || favouriteItems.length > 0) {
      return classes.padding_20_28_36;
    }
    return "padding-8";
  };

  return (
    <section
      className={`flex-column white-container fixed gap-4 ${classes.container} ${getPadding()}`}
      ref={ref}
    >
      {TabsButton ? TabsButton : null}
      {isEtiketkaPage && width <= 768 ? <AddEtiketkaButton /> : null}
      <TabsList cartItems={cartItems} favouriteItems={favouriteItems} />
    </section>
  );
}
