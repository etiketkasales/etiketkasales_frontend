import React from "react";

import classes from "./catalogue-page.module.scss";
import PageWrapper from "~/src/entities/page-wrapper/ui";
import CategoriesSwiper from "~/src/features/categories/ui/swiper/ui";
import ProductsFilters from "~/src/features/filters/ui";
import CatalogueSection from "~/src/entities/catalogue-section/ui";
import { IFilters } from "~/src/features/filters/model/filters.interface";

interface Props {
  initFilters: IFilters;
}

export default function CataloguePage({ initFilters }: Props) {
  return (
    <PageWrapper>
      <CategoriesSwiper
        title={`Каталог этикеток`}
        type="catalogue"
        className={classes.categories}
      />
      <div className={`flex-row gap-5 flex-start`}>
        <ProductsFilters
          initFilters={initFilters}
          className={classes.filters}
        />
        <CatalogueSection initFilters={initFilters} />
      </div>
    </PageWrapper>
  );
}
