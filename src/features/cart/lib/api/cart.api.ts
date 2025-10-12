import { apiClient, tryCatch } from "~/src/shared/lib/api/client.api";
import { IGetData } from "~/src/shared/model/shared.interface";
import { IGetCart, IValidateCart } from "../../model/cart.interface";

export const getCart = async () => {
  await tryCatch(async () => {
    const response = await apiClient.get<IGetData<IGetCart[]>>(`/cart`);

    return response.data;
  });
};

export const deleteCart = async () => {
  await tryCatch(async () => {
    const response = await apiClient.delete(`/cart`);
    return response.data;
  });
};

export const addToCart = async (product_id: number, quantity: number) => {
  await tryCatch(async () => {
    const response = await apiClient.post(`/cart/add`, {
      product_id,
      quantity,
    });

    return response.data;
  });
};

export const updateProductCount = async (
  product_id: number,
  quantity: number,
) => {
  await tryCatch(async () => {
    const response = await apiClient.put(`/cart/${product_id}`, {
      quantity,
    });
    return response.data;
  });
};

export const deleteProductFromCart = async (product_id: number) => {
  await tryCatch(async () => {
    const response = await apiClient.delete(`/cart/${product_id}`);

    return response.data;
  });
};

export const validateCart = async () => {
  await tryCatch(async () => {
    const response =
      await apiClient.post<IGetData<IValidateCart>>(`/cart/validate`);

    return response.data.data;
  });
};

export const mergeCart = async () => {
  await tryCatch(async () => {
    const response = await apiClient.post(`/cart/merge`);

    return response.data;
  });
};
