"use client";

import { useAppDispatch } from "~/src/app/store/hooks";
import { setCatalogueActiveCategories } from "~/src/app/store/reducers/catalogue.slice";

import CurrentFiltersItem from "../filter";

interface Props {
  categories: string[];
}

export default function CurrentCategories({ categories }: Props) {
  const dispatch = useAppDispatch();
  return (
    <CurrentFiltersItem
      title="Категория"
      value={categories[0] || "Все категории"}
      filterName="category_id"
      lastCount={categories.length - 1}
      onClick={() => {
        dispatch(setCatalogueActiveCategories(null));
      }}
    />
  );
}
