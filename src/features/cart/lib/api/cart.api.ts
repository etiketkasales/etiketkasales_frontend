import { apiClient, tryCatch } from "~/src/shared/lib/api";
import { IGetData } from "~/src/shared/model";
import { IGetCart } from "~/src/features/cart/model";
import {
  normalizeLineQuantity,
  normalizeMinOrderQuantity,
  normalizeProductId,
} from "../utils";

export const getCart = async () => {
  return await tryCatch(async () => {
    const response = await apiClient.get<IGetData<IGetCart>>(`/cart/`);

    return response.data.data;
  });
};

export const addToCart = async (product_id: number, quantity: number) => {
  return await tryCatch(async () => {
    const pid = normalizeProductId(product_id);
    const qty = normalizeMinOrderQuantity(quantity);
    if (Number.isNaN(pid)) {
      throw new Error("Некорректный id товара");
    }
    const response = await apiClient.post(`/cart/add/`, {
      product_id: pid,
      quantity: qty,
    });

    return response.data;
  });
};

export const updateProductCount = async (
  product_id: number,
  quantity: number,
) => {
  return await tryCatch(async () => {
    const pid = normalizeProductId(product_id);
    const qty = normalizeLineQuantity(quantity);
    if (Number.isNaN(pid)) {
      throw new Error("Некорректный id товара");
    }
    const response = await apiClient.put(`/cart/by-product/${pid}/`, {
      quantity: qty,
    });
    return response.data;
  });
};

export const deleteProductFromCart = async (product_id: number) => {
  return await tryCatch(async () => {
    const pid = normalizeProductId(product_id);
    if (Number.isNaN(pid)) {
      throw new Error("Некорректный id товара");
    }
    const response = await apiClient.delete(`/cart/by-product/${pid}/`);

    return response.data;
  });
};

export const mergeCart = async () => {
  return await tryCatch(async () => {
    const response = await apiClient.post(`/cart/merge/`);

    return response.data;
  });
};

export const multiDeleteProducts = async (productIds: number[]) => {
  return await tryCatch(async () => {
    const ids = productIds
      .map((id) => normalizeProductId(id))
      .filter((id) => !Number.isNaN(id));
    const res = await apiClient.post(`/cart/remove-items/`, {
      ids,
    });

    return res.data;
  });
};
