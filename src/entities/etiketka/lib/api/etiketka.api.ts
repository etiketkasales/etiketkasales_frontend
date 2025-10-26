import { apiClient, tryCatch } from "~/src/shared/lib/api/client.api";
import { IGetData } from "~/src/shared/model";
import {
  IEtiketka,
  IGetProductsBySlug,
  ISearchEtiketkaByInput,
  ISearchEtiketkaResponse,
} from "~/src/entities/etiketka/model";

export const getProductById = async (id: number) => {
  return await tryCatch(async () => {
    const response = await apiClient.get<IGetData<IEtiketka>>(
      `/products/${id}`,
    );
    return response.data.data;
  });
};

interface IParams {
  [key: string]: string | undefined;
}

export const getProductsByFilters = async (query: IParams) => {
  return await tryCatch(async () => {
    const response = await apiClient.get<IGetData<ISearchEtiketkaResponse>>(
      `/products`,
      {
        params: {
          page: query.page || "1",
          per_page: query.per_page || "20",
          ...query,
        },
      },
    );

    return response.data.data.products;
  });
};

export const searchProductsByInput = async (q: string, page?: number) => {
  return await tryCatch(async () => {
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
  return await tryCatch(async () => {
    const response = await apiClient.get<IGetData<IGetProductsBySlug>>(
      `/products/category/${slug}`,
    );

    return response.data.data;
  });
};

export const getRecommendedProducts = async (
  category_id: number,
  exclude_product_id: number,
  limit?: number,
) => {
  return await tryCatch(async () => {
    const res = await apiClient.get<IGetData<IEtiketka[]>>(
      `/products/recommended`,
      {
        params: {
          category_id,
          exclude_product_id,
          limit,
        },
      },
    );
    return res.data.data;
  });
};
