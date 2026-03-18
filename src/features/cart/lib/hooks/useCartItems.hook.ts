import { useCallback, useState } from "react";
import { useCart } from ".";
import { useCreateNotification } from "~/src/widgets/notifications/lib/hooks";

import {
  addToCart,
  deleteProductFromCart,
  updateProductCount,
} from "../api/cart.api";
import { promiseWrapper } from "~/src/shared/lib";

interface Props {
  itemId: number;
}

export const useCartItems = ({ itemId }: Props) => {
  const { updateCart } = useCart({ needInitialize: false });
  const [loading, setLoading] = useState<boolean>(false);
  const createNotification = useCreateNotification();

  const functionWrapper = useCallback(
    async (
      callback: () => Promise<void>,
      fallback?: (err?: string) => void,
    ) => {
      return await promiseWrapper({
        setLoading,
        callback,
        fallback,
      });
    },
    [],
  );

  const handleAddEtiketka = useCallback(
    async (minQuantity: number) => {
      return await functionWrapper(
        async () => {
          await addToCart(itemId, minQuantity);
          await updateCart();
        },
        (err) =>
          createNotification(err || "Не удалось добавить товар", "error"),
      );
    },
    [functionWrapper, updateCart, itemId, createNotification],
  );

  const handleUpdateEtiketka = useCallback(
    async (quantity: number) => {
      await functionWrapper(
        async () => {
          await updateProductCount(itemId, quantity);
          await updateCart();
        },
        (err) =>
          createNotification(err || "Не удалось обновить товар", "error"),
      );
    },
    [functionWrapper, updateCart, itemId, createNotification],
  );

  const handleDeleteEtiketka = useCallback(async () => {
    await functionWrapper(
      async () => {
        await deleteProductFromCart(itemId);
        await updateCart();
      },
      (err) => createNotification(err || "Не удалось удалить товар", "error"),
    );
  }, [functionWrapper, updateCart, itemId, createNotification]);

  return {
    handleAddEtiketka,
    handleUpdateEtiketka,
    handleDeleteEtiketka,
  };
};
