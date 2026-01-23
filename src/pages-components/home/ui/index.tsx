"use client";
import React from "react";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectNavigation } from "~/src/app/store/reducers/navigation.slice";

import classes from "./home.module.scss";
import PageWrapper from "~/src/entities/page-wrapper/ui";
import AddsBanner from "~/src/shared/ui/advs/ui/swiper";
import CategoriesSwiper from "~/src/features/categories/ui/swiper/ui";
import SectionWrapper from "~/src/entities/section-wrapper/ui";
import ThreeAds from "~/src/shared/ui/advs/ui/three-ads";
import { IGetRandomCategories } from "~/src/features/categories/model";

interface Props {
  initialSections: IGetRandomCategories[] | [];
}

export default function HomePage({ initialSections: sections }: Props) {
  const { loaded } = useAppSelector(selectNavigation);

  return (
    <PageWrapper>
      <section className={`flex-column gap-5 ${classes.container}`}>
        <AddsBanner className={classes.add} />
        <CategoriesSwiper
          title={"На что планируете клеить этикетки?"}
          type="home"
        />
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
