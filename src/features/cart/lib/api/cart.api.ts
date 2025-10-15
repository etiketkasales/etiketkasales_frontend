import { apiClient, tryCatch } from "~/src/shared/lib/api/client.api";
import { IGetData } from "~/src/shared/model/shared.interface";
import { IGetCart, IValidateCart } from "../../model/cart.interface";

export const getCart = async () => {
  const res = await tryCatch(async () => {
    const response = await apiClient.get<IGetData<IGetCart>>(`/cart`);

    return response.data.data;
  });
  return res;
};

export const deleteCart = async () => {
  const res = await tryCatch(async () => {
    const response = await apiClient.delete(`/cart`);
    return response.data;
  });

  return res;
};

export const addToCart = async (product_id: number, quantity: number) => {
  const res = await tryCatch(async () => {
    const response = await apiClient.post(`/cart/add`, {
      product_id,
      quantity,
    });

    return response.data;
  });

  return res;
};

export const updateProductCount = async (
  product_id: number,
  quantity: number,
) => {
  const res = await tryCatch(async () => {
    const response = await apiClient.put(`/cart/${product_id}`, {
      quantity,
    });
    return response.data;
  });

  return res;
};

export const deleteProductFromCart = async (product_id: number) => {
  const res = await tryCatch(async () => {
    const response = await apiClient.delete(`/cart/${product_id}`);

    return response.data;
  });

  return res;
};

export const validateCart = async () => {
  const res = await tryCatch(async () => {
    const response =
      await apiClient.post<IGetData<IValidateCart>>(`/cart/validate`);

    return response.data.data;
  });
  return res;
};

export const mergeCart = async () => {
  const res = await tryCatch(async () => {
    const response = await apiClient.post(`/cart/merge`);

    return response.data;
  });
  return res;
};
