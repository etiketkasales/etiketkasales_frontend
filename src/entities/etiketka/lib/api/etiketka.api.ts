import { apiClient, tryCatch } from "~/src/shared/lib/api/client.api";
import { IGetData } from "~/src/shared/model/shared.interface";
import {
  IEtiketka,
  IGetProductsBySlug,
  ISearchEtiketkaByInput,
  ISearchEtiketkaResponse,
  ISearchParameters,
} from "../../model/etiketka.interface";

export const getProductById = async (id: number) => {
  try {
    const response = await apiClient.get<IGetData<IEtiketka>>(
      `/products/${id}`,
    );
    return response.data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getProductsBySearch = async (query: ISearchParameters) => {
  await tryCatch(async () => {
    const response = await apiClient.get<IGetData<ISearchEtiketkaResponse>>(
      `/products`,
      {
        params: {
          page: query.page || 1,
          per_page: query.per_page || 20,
          ...query,
        },
      },
    );

    return response.data.data;
  });
};

export const searchProductsByInput = async (q: string, page?: number) => {
  await tryCatch(async () => {
    const res = await apiClient.get<IGetData<ISearchEtiketkaByInput>>(
      `/products/search`,
      {
        params: {
          q,
          page: page || 1,
        },
      },
    );

    return res.data.data;
  });
};

export const getProductsBySlug = async (slug: string) => {
  await tryCatch(async () => {
    const response = await apiClient.get<IGetData<IGetProductsBySlug>>(
      `/products/category/${slug}`,
    );

    return response.data.data;
  });
};
