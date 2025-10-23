import { Metadata } from "next";
import { handleGetProductsFilters } from "~/src/features/filters/lib/functions/getFilters.function";

import CataloguePage from "~/src/pages-components/catalogue/ui";

export const metadata: Metadata = {
  title: "ЭТИКЕТКАСЕЙЛС | Каталог",
  description: "Каталог этикеток с фильтрами",
};

export default async function Page() {
  const filters = await handleGetProductsFilters();
  return <CataloguePage initFilters={filters} />;
}
