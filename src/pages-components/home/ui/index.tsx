"use client";
import React, { useEffect } from "react";
import { useWindowSize } from "react-use";
import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import { clearFilters } from "~/src/app/store/reducers/categories.slice";
import { useHome } from "~/src/pages-components/home/lib/hooks/useHome.hook";
import { selectNavigation } from "~/src/app/store/reducers/navigation.slice";

import classes from "./home.module.scss";
import PageWrapper from "~/src/entities/page-wrapper/ui";
import AddsBanner from "~/src/shared/ui/advs/ui/swiper";
import CategoriesSwiper from "~/src/shared/ui/categories-swiper/ui";
import SectionWrapper from "~/src/entities/section-wrapper/ui";
import ThreeAds from "~/src/shared/ui/advs/ui/three-ads";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { width } = useWindowSize();
  const { sections, loading } = useHome();
  const { loaded } = useAppSelector(selectNavigation);

  useEffect(() => {
    dispatch(clearFilters());
  }, [dispatch]);

  return (
    <PageWrapper>
      {width <= 460 && (
        <div className={`white-container absolute ${classes.container}`}></div>
      )}
      <section
        className={`flex-column gap-5 ${width <= 460 ? "white-container" : ""}`}
      >
        <AddsBanner className={classes.add} />
        <CategoriesSwiper title={"На что планируете клеить этикетки?"} />
      </section>
      {sections.map((section, index) => {
        return (
          <React.Fragment key={index}>
            <SectionWrapper
              title={section.title}
              arrayProducts={section.items}
              categoryId={section.categoryId}
              loading={loading || !loaded}
            />
            {index === 0 && <ThreeAds />}
          </React.Fragment>
        );
      })}
    </PageWrapper>
  );
}
