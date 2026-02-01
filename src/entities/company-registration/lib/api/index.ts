import { apiClient, tryCatch } from "~/src/shared/lib";
import { IAvailableCity } from "../../model";

export const getAvailableCities = async (query: string) => {
  return await tryCatch(async () => {
    const res = await apiClient.get<{ cities: IAvailableCity[] }>(
      `/seller/available-cities/`,
      {
        params: {
          search: query,
        },
      },
    );
    return res.data;
  });
};
