import { useCallback, useEffect, useState } from "react";
import { useCreateNotification } from "~/src/widgets/notifications/lib/hooks";
import { promiseWrapper } from "~/src/shared/lib/functions/shared.func";
import {
  deleteSellerProduct,
  editSellerProduct,
  getSellerProducts,
} from "~/src/entities/profile-section/lib/api";

import { MessageI } from "~/src/shared/model";
import {
  IEditSellerProduct,
  ISellerProduct,
} from "~/src/entities/profile-section/model";

interface Props {
  onClose?: () => void;
  needLoad?: boolean;
}

/**
 * useSellerProducts - a hook that provides functions and state to
 *   interact with seller products.
 * @param {Object} props - an object containing the onClose
 *   function to close the modal and a boolean indicating whether to
 *   load the seller products initially.
 * @returns {Object} - an object containing the following properties:
 *   loading - a boolean indicating whether the products are being loaded,
 *   promiseCallback - a function that wraps a promise with a
 *     callback, error - a string indicating the error message,
 *     setError - a function to set the error message,
 *     sellerProducts - an array of ISellerProduct,
 *     updateSellerProducts - a function to update the seller products,
 *     modal - an object containing the modal state,
 *     setModal - a function to set the modal state,
 *     editProductId - a number indicating the ID of the product to edit,
 *     setEditProductId - a function to set the ID of the product to edit,
 *     updateProduct - a function to update a product,
 *     deleteProduct - a function to delete a product.
 */
export const useSellerProducts = ({ onClose, needLoad }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<MessageI | null>(null);
  const [sellerProducts, setSellerProducts] = useState<ISellerProduct[]>([]);
  const [editProductId, setEditProductId] = useState<number>(0);
  const createNotification = useCreateNotification();

  const promiseCallback = useCallback(
    async (callback: () => Promise<void>, fallback?: () => void) => {
      await promiseWrapper({
        setLoading,
        setError,
        callback,
        fallback,
      });
    },
    [],
  );

  const updateSellerProducts = useCallback(async () => {
    await promiseCallback(
      async () => {
        const res = await getSellerProducts();
        if (res) {
          setSellerProducts(res.products);
        }
      },
      () => createNotification("Не удалось обновить товары", "error"),
    );
  }, [promiseCallback, createNotification]);

  const deleteProduct = useCallback(
    async (id: number) => {
      await promiseCallback(
        async () => {
          await deleteSellerProduct(id);
          createNotification("Товар удалён", "success");
          await updateSellerProducts();
          onClose?.();
        },
        () => createNotification("Не удалось удалить товар", "error"),
      );
    },
    [promiseCallback, updateSellerProducts, onClose, createNotification],
  );

  const updateProduct = useCallback(
    async (data: IEditSellerProduct, id: number) => {
      await promiseCallback(
        async () => {
          await editSellerProduct(data, id);
          await updateSellerProducts();
          createNotification("Товар изменён", "success");
          onClose?.();
        },
        () => createNotification("Не удалось изменить товар", "error"),
      );
    },
    [promiseCallback, updateSellerProducts, onClose],
  );

  useEffect(() => {
    if (!needLoad) return;
    updateSellerProducts();
  }, [updateSellerProducts, needLoad]);

  return {
    loading,
    promiseCallback,
    error,
    setError,
    sellerProducts,
    updateSellerProducts,
    editProductId,
    setEditProductId,
    updateProduct,
    deleteProduct,
  };
};
