"use client";
import React from "react";

import PageWrapper from "~/src/entities/page-wrapper/ui";
import CategoriesSwiper from "~/src/features/categories/ui/swiper/ui";

export default function CataloguePage() {
  return (
    <PageWrapper>
      <CategoriesSwiper title={`Каталог этикеток`} type="catalogue" />
    </PageWrapper>
  );
}
