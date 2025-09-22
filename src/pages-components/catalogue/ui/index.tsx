"use client";
import React from "react";

import PageWrapper from "~/src/entities/page-wrapper/ui";
import CategoriesSwiper from "~/src/shared/ui/categories-swiper/ui";

export default function CataloguePage() {
  return (
    <PageWrapper>
      <CategoriesSwiper title={`Каталог этикеток`} />
    </PageWrapper>
  );
}
