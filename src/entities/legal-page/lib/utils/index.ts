import { getLegalPageFromApi } from "~/src/entities/legal-page/lib/api";

export const getLegalPage = async (slug: string) => {
  try {
    const res = await getLegalPageFromApi(slug);
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
