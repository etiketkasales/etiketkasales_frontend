import React from "react";

import PageWrapper from "~/src/entities/page-wrapper/ui";
import CategoriesSwiper from "~/src/features/categories/ui/swiper/ui";
import ProductsFilters from "~/src/features/filters/ui";
import { IFilters } from "~/src/features/filters/model/filters.interface";

interface Props {
  initFilters: IFilters;
}

export default function CataloguePage({ initFilters }: Props) {
  return (
    <PageWrapper>
      <CategoriesSwiper title={`Каталог этикеток`} type="catalogue" />
      <ProductsFilters initFilters={initFilters} />
    </PageWrapper>
  );
}
