import { getCategoriesTree } from "~/src/features/categories/lib/api/categories.api";
import { ITreeCategory } from "~/src/features/categories/model/categories.interface";
import CataloguePage from "~/src/pages-components/catalogue/ui";

export default async function Page() {
  let loading: boolean = false;
  let categoriesTree: ITreeCategory[] = [];
  try {
    loading = true;
    const res = await getCategoriesTree();
    categoriesTree = res;
  } catch (err) {
    categoriesTree = [];
    console.error(err);
  } finally {
    loading = false;
  }

  return <CataloguePage categoriesTree={categoriesTree} />;
}
