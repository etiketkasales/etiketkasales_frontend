"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import {
  addFilter,
  selectCategories,
} from "~/src/app/store/reducers/categories.slice";
import { useWindowSize } from "react-use";

import Tabs from "~/src/widgets/tabs/ui";
import Footer from "~/src/entities/footer/ui";
import HeaderDefault from "../../header-default/ui";
import { categoryAll } from "~/src/shared/ui/categories-swiper/model/categories.const";

export default function PageWrapper({
  children,
  CustomHeader,
  TabsButton,
}: {
  children: React.ReactNode;
  CustomHeader?: React.ReactNode;
  TabsButton?: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const { currentFilter } = useAppSelector(selectCategories);
  const { width } = useWindowSize();

  useEffect(() => {
    const isHome = window.location.pathname === "/";
    if (currentFilter.length > 0 || isHome) return;
    dispatch(addFilter(categoryAll));
  }, [currentFilter.length, dispatch]);

  return (
    <>
      {CustomHeader ? CustomHeader : <HeaderDefault />}
      <main
        className={`wrapper flex-column gap-5`}
        style={{ marginBottom: "auto" }}
      >
        {children}
      </main>
      <Footer />
      {width <= 768 ? <Tabs TabsButton={TabsButton} /> : null}
    </>
  );
}
