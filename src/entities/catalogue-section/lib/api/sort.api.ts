import { apiClient, tryCatch } from "~/src/shared/lib/api/client.api";
import { IGetData } from "~/src/shared/model";
import { ISortOption } from "../../model";

export const getCatalogueSortOptions = async () => {
  return await tryCatch(async () => {
    const res = await apiClient.get<IGetData<ISortOption[]>>(
      `/products/sort-options/`,
    );
    return res.data;
  });
};
