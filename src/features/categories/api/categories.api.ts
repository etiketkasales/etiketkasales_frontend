import { IGetData } from "~/src/shared/model/shared.interface";
import {
  ICategory,
  IGetRandomCategories,
  ITreeCategory,
} from "../model/categories.interface";
import { apiClient, tryCatch } from "~/src/shared/lib/api/client.api";

export const getRandomCategories = async () => {
  const res = await tryCatch(async () => {
    const response = await apiClient.get<IGetData<IGetRandomCategories[]>>(
      `/categories/random`,
      {
        params: {
          limit: 3,
          products_per_category: 5,
        },
      },
    );
    return response.data.data;
  });

  return res;
};

export const getCategories = async () => {
  const res = await tryCatch(async () => {
    const response = await apiClient.get<IGetData<ICategory[]>>(`/categories`);

    return response.data.data;
  });
  return res;
};

export const getCategoriesTree = async () => {
  const res = await tryCatch(async () => {
    const response =
      await apiClient.get<IGetData<ITreeCategory[]>>(`/categories/tree`);

    return response.data.data;
  });
  return res;
};

export const getCategoryById = async (id: number) => {
  const res = await tryCatch(async () => {
    const response = await apiClient.get<IGetData<ICategory>>(
      `/categories/${id}`,
    );
  });

  return res;
};
