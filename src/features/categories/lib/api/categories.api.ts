import { IGetData } from "~/src/shared/model";
import {
  ICategory,
  IGetRandomCategories,
  ITreeCategory,
} from "~/src/features/categories/model";
import { apiClient, tryCatch } from "~/src/shared/lib/api";

export const getRandomCategories = async () => {
  const res = await tryCatch(async () => {
    const response = await apiClient.get<IGetData<IGetRandomCategories[]>>(
      `/categories/random/`,
      {
        params: {
          limit: 3,
          products_per_category: 5,
        },
      },
    );
    return (response.data.data ?? []).map((section) => ({
      ...section,
      products: (section.products ?? []).map((product) => ({
        ...product,
        min_order_quantity: Number(
          (product as any).min_order_quantity ??
            (product as any).min_order ??
            1,
        ),
      })),
    }));
  });

  return res;
};

export const getCategories = async () => {
  return await tryCatch(async () => {
    const response = await apiClient.get<IGetData<ICategory[]>>(
      `/categories/`,
      {
        params: {
          for_home: 1,
        },
      },
    );

    return response.data.data ?? [];
  });
};

export const getCategoriesTree = async () => {
  const res = await tryCatch(async () => {
    const response =
      await apiClient.get<IGetData<ITreeCategory[]>>(`/categories/tree/`);

    return response.data.data;
  });
  return res;
};

export const getCategoryById = async (id: number) => {
  const res = await tryCatch(async () => {
    const response = await apiClient.get<IGetData<ICategory>>(
      `/categories/${id}/`,
    );
    return response.data.data;
  });

  return res;
};
