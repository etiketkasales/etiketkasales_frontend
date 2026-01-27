import { getRandomCategories } from "~/src/features/categories/lib/api/categories.api";
export { layoutMetadata as metadata, viewport } from "~/src/shared/config";

import HomePage from "../pages-components/home/ui";
import { IGetRandomCategories } from "../features/categories/model/categories.interface";

export const dynamic = "force-dynamic";

export default async function Home() {
  let initialSections: IGetRandomCategories[] = [];
  try {
    initialSections = await getRandomCategories();
  } catch (err) {
    console.error(err);
    initialSections = [];
  }
  return <HomePage initialSections={initialSections} />;
}
