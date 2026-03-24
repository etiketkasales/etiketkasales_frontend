import { useCallback, useState } from "react";
import { useCart } from ".";
import { useCreateNotification } from "~/src/widgets/notifications/lib/hooks";

import {
  addToCart,
  deleteProductFromCart,
  updateProductCount,
} from "../api/cart.api";
import { promiseWrapper } from "~/src/shared/lib";
import {
  normalizeMinOrderQuantity,
  normalizeProductId,
} from "~/src/features/cart/lib/utils";

interface Props {
  itemId: number | string;
}

export const useCartItems = ({ itemId }: Props) => {
  const productId = normalizeProductId(itemId);
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
    async (minQuantity: number | string) => {
      if (Number.isNaN(productId)) {
        createNotification("Некорректный id товара", "error");
        return;
      }
      const qty = normalizeMinOrderQuantity(minQuantity);
      return await functionWrapper(
        async () => {
          await addToCart(productId, qty);
          await updateCart();
        },
        (err) =>
          createNotification(err || "Не удалось добавить товар", "error"),
      );
    },
    [functionWrapper, updateCart, productId, createNotification],
  );

  const handleUpdateEtiketka = useCallback(
    async (quantity: number) => {
      if (Number.isNaN(productId)) {
        createNotification("Некорректный id товара", "error");
        return;
      }
      await functionWrapper(
        async () => {
          await updateProductCount(productId, quantity);
          await updateCart();
        },
        (err) =>
          createNotification(err || "Не удалось обновить товар", "error"),
      );
    },
    [functionWrapper, updateCart, productId, createNotification],
  );

  const handleDeleteEtiketka = useCallback(async () => {
    if (Number.isNaN(productId)) {
      createNotification("Некорректный id товара", "error");
      return;
    }
    await functionWrapper(
      async () => {
        await deleteProductFromCart(productId);
        await updateCart();
      },
      (err) => createNotification(err || "Не удалось удалить товар", "error"),
    );
  }, [functionWrapper, updateCart, productId, createNotification]);

  return {
    handleAddEtiketka,
    handleUpdateEtiketka,
    handleDeleteEtiketka,
  };
};
