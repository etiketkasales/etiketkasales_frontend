import { getRandomCategories } from "~/src/features/categories/lib/api/categories.api";

import HomePage from "../pages-components/home/ui";
import { IGetRandomCategories } from "../features/categories/model/categories.interface";

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
