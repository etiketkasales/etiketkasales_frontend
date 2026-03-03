import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
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
  setSellerProducts: Dispatch<SetStateAction<ISellerProduct[]>>;
  onClose?: () => void;
  needLoad?: boolean;
}

/**
 * useSellerProducts - a hook that provides functions and state to interact
 *   with seller products.
 *
 * @param {Props} onClose - a callback that is called when the modal is closed.
 * @param {Props} needLoad - a boolean indicating whether the orders should be loaded.
 * @param {Props} setSellerProducts - a callback that is called when the seller products are updated.
 * @returns {Object} - an object containing the following properties:
 *   loading - a boolean indicating whether the orders are being loaded,
 *   error - a string indicating the error message,
 *   updateSellerProducts - a function to update the seller products,
 *   editProductId - a number indicating the id of the product being edited,
 *   setEditProductId - a callback that is called when the product id is changed,
 *   updateProduct - a function to update a product,
 *   deleteProduct - a function to delete a product.
 */
export const useSellerProducts = ({
  onClose,
  needLoad,
  setSellerProducts,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<MessageI | null>(null);
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
    updateSellerProducts,
    editProductId,
    setEditProductId,
    updateProduct,
    deleteProduct,
  };
};
