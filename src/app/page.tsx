import { getRandomCategories } from "../features/categories/api/categories.api";
import { IGetRandomCategories } from "../features/categories/model/categories.interface";
import HomePage from "../pages-components/home/ui";

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
