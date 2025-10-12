"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import { clearFilters } from "~/src/app/store/reducers/categories.slice";
import { selectNavigation } from "~/src/app/store/reducers/navigation.slice";

import classes from "./home.module.scss";
import PageWrapper from "~/src/entities/page-wrapper/ui";
import AddsBanner from "~/src/shared/ui/advs/ui/swiper";
import CategoriesSwiper from "~/src/shared/ui/categories-swiper/ui";
import SectionWrapper from "~/src/entities/section-wrapper/ui";
import ThreeAds from "~/src/shared/ui/advs/ui/three-ads";
import { IGetRandomCategories } from "~/src/features/categories/model/categories.interface";

interface Props {
  initialSections: IGetRandomCategories[] | [];
}

export default function HomePage({ initialSections: sections }: Props) {
  const dispatch = useAppDispatch();
  const { loaded } = useAppSelector(selectNavigation);

  useEffect(() => {
    dispatch(clearFilters());
  }, [dispatch]);

  return (
    <PageWrapper>
      <section className={`flex-column gap-5 ${classes.container}`}>
        <AddsBanner className={classes.add} />
        <CategoriesSwiper title={"На что планируете клеить этикетки?"} />
      </section>
      {sections.map((section, index) => {
        return (
          <React.Fragment key={index}>
            <SectionWrapper
              title={section.category.name}
              arrayProducts={section.products}
              categoryId={section.category.id}
              loading={!loaded}
            />
            {index === 0 && <ThreeAds />}
          </React.Fragment>
        );
      })}
    </PageWrapper>
  );
}
