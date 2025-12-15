import { ISearchPagination } from "~/src/entities/etiketka/model";
import {
  IEditSellerProduct,
  INewProduct,
  INewProductFilter,
  ISellerProduct,
} from "~/src/entities/profile-section/model";
import { apiClient, tryCatch } from "~/src/shared/lib/api";
import { IFileUploadRes, IGetData } from "~/src/shared/model";

export const uploadProductImage = async (formData: FormData) => {
  return await tryCatch(async () => {
    const res = await apiClient.post<IGetData<IFileUploadRes>>(
      `/upload/product-image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return res.data.data;
  });
};

export const getNewProductFilters = async () => {
  return await tryCatch(async () => {
    const res = await apiClient.get<IGetData<INewProductFilter[]>>(
      `/products/filters/create-form/`,
    );
    return res.data.data;
  });
};

interface ISellerProductsResponse {
  products: ISellerProduct[];
  pagination: ISearchPagination;
}
export const getSellerProducts = async (page?: number, limit?: number) => {
  return await tryCatch(async () => {
    const res = await apiClient.get<IGetData<ISellerProductsResponse>>(
      `/seller/products/`,
      {
        params: {
          page: page || 1,
          limit: limit || 50,
        },
      },
    );
    return res.data.data;
  });
};

export const createNewProduct = async (data: INewProduct) => {
  return await tryCatch(async () => {
    const res = await apiClient.post(`/products/`, {
      ...data,
    });

    return res.data;
  });
};

export const editSellerProduct = async (
  data: IEditSellerProduct,
  id: number,
) => {
  return await tryCatch(async () => {
    const res = await apiClient.put(`/proructs/${id}`, {
      ...data,
    });
    return res.data;
  });
};

export const deleteSellerProduct = async (id: number) => {
  return await tryCatch(async () => {
    const res = await apiClient.delete(`/products/${id}`);

    return res.data;
  });
};
