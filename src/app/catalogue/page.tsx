import { handleGetProductsFilters } from "~/src/features/filters/lib/functions/getFilters.function";

import CataloguePage from "~/src/pages-components/catalogue/ui";

export default async function Page() {
  const filters = await handleGetProductsFilters();
  return <CataloguePage initFilters={filters} />;
}
