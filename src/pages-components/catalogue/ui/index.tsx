import React from "react";

import PageWrapper from "~/src/entities/page-wrapper/ui";
import { ITreeCategory } from "~/src/features/categories/model/categories.interface";
import CategoriesSwiper from "~/src/features/categories/ui/swiper/ui";

interface Props {
  categoriesTree: ITreeCategory[];
}

export default function CataloguePage({ categoriesTree }: Props) {
  return (
    <PageWrapper>
      <CategoriesSwiper title={`Каталог этикеток`} type="catalogue" />
    </PageWrapper>
  );
}
