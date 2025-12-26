import { ILegalPage } from "~/src/entities/legal-page/model";
import { apiClient, tryCatch } from "~/src/shared/lib";
import { IGetData } from "~/src/shared/model";

export const getLegalPageFromApi = async (slug: string) => {
  return await tryCatch(async () => {
    const res = await apiClient.get<IGetData<ILegalPage>>(`/pages/${slug}`);
    return res.data.data;
  });
};
