import { apiClient, tryCatch } from "~/src/shared/lib/api/client.api";
import { IGetData } from "~/src/shared/model";
import { IFilters } from "~/src/features/filters/model";

export const getProductsFilters = async () => {
  return await tryCatch(async () => {
    const res = await apiClient.get<IGetData<IFilters>>(`/products/filters/`);
    return res.data.data;
  });
};
