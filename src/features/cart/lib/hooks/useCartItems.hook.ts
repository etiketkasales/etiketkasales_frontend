import { useCallback, useMemo, useState } from "react";
import { useCart } from "./useCart.hook";
import {
  CartButton,
  deleteProductFromCart,
  updateProductCount,
} from "../api/cart.api";

interface Props {
  itemId: number;
}

export const useCartItems = ({ itemId }: Props) => {
  const { updateCart } = useCart();

  const functionWrapper = useCallback(async (callback: () => any) => {
    try {
      await callback();
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleAddEtiketka = useCallback(async () => {
    await functionWrapper(async () => {
      await CartButton(itemId, 1);
      await updateCart();
    });
  }, [functionWrapper, updateCart, itemId]);

  const handleUpdateEtiketka = useCallback(
    async (quantity: number) => {
      await functionWrapper(async () => {
        await updateProductCount(itemId, quantity);
        await updateCart();
      });
    },
    [functionWrapper, updateCart, itemId],
  );

  const handleDeleteEtiketka = useCallback(async () => {
    await functionWrapper(async () => {
      await deleteProductFromCart(itemId);
      await updateCart();
    });
  }, [functionWrapper, updateCart, itemId]);

  return {
    handleAddEtiketka,
    handleUpdateEtiketka,
    handleDeleteEtiketka,
  };
};
