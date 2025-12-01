export { catalogueMetadata as metadata } from "~/src/shared/config/metadata/catalogue.metadata";

import CataloguePage from "~/src/pages-components/catalogue/ui";

export default async function Page() {
  return <CataloguePage />;
}
