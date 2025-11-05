import { handleGetProductsFilters } from "~/src/features/filters/lib/functions/getFilters.function";
export { catalogueMetadata as metadata } from "~/src/shared/config/metadata/catalogue.metadata";

import CataloguePage from "~/src/pages-components/catalogue/ui";

export default async function Page() {
  const filters = await handleGetProductsFilters();
  return <CataloguePage initFilters={filters} />;
}
