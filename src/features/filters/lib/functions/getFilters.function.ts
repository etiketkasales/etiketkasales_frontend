import { getProductsFilters } from "~/src/features/filters/lib/api";

import { IFilters } from "~/src/features/filters/model/filters.interface";

export const handleGetProductsFilters = async () => {
  let filters: IFilters = {};
  try {
    const res = await getProductsFilters();
    filters = res;
  } catch (err) {
    filters = {};
    console.error(err);
  }
  return filters;
};
