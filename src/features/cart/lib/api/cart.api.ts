import { apiClient, tryCatch } from "~/src/shared/lib/api";
import { IGetData } from "~/src/shared/model";
import { IGetCart, IValidateCart } from "../../model/cart.interface";
import {
  normalizeLineQuantity,
  normalizeMinOrderQuantity,
  normalizeProductId,
} from "../utils";

export const getCart = async () => {
  const res = await tryCatch(async () => {
    const response = await apiClient.get<IGetData<IGetCart>>(`/cart/`);

    return response.data.data;
  });
  return res;
};

export const deleteCart = async () => {
  const res = await tryCatch(async () => {
    const response = await apiClient.delete(`/cart/`);
    return response.data;
  });

  return res;
};

export const addToCart = async (product_id: number, quantity: number) => {
  const res = await tryCatch(async () => {
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

  return res;
};

export const updateProductCount = async (
  product_id: number,
  quantity: number,
) => {
  const res = await tryCatch(async () => {
    const pid = normalizeProductId(product_id);
    const qty = normalizeLineQuantity(quantity);
    if (Number.isNaN(pid)) {
      throw new Error("Некорректный id товара");
    }
    const response = await apiClient.put(`/cart/${pid}/`, {
      quantity: qty,
    });
    return response.data;
  });

  return res;
};

export const deleteProductFromCart = async (product_id: number) => {
  const res = await tryCatch(async () => {
    const pid = normalizeProductId(product_id);
    if (Number.isNaN(pid)) {
      throw new Error("Некорректный id товара");
    }
    const response = await apiClient.delete(`/cart/${pid}/`);

    return response.data;
  });

  return res;
};

export const validateCart = async () => {
  const res = await tryCatch(async () => {
    const response =
      await apiClient.post<IGetData<IValidateCart>>(`/cart/validate/`);

    return response.data.data;
  });
  return res;
};

export const mergeCart = async () => {
  const res = await tryCatch(async () => {
    const response = await apiClient.post(`/cart/merge/`);

    return response.data;
  });
  return res;
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
