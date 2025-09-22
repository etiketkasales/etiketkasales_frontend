import { apiClient } from "~/src/features/login/lib/api/login.api";
import { GetDataInterface } from "~/src/shared/model/shared.interface";
import { CategoryItemInterface } from "../../model/categories.interface";

export const getCategoriesList = async () => {
  try {
    const response = await apiClient.get<
      GetDataInterface<CategoryItemInterface[]>
    >(`/categories/get-list/`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
