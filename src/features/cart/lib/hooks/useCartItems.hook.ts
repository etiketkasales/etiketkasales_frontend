import { useCallback } from "react";
import { useCart } from "./useCart.hook";
import {
  addToCart,
  deleteProductFromCart,
  updateProductCount,
} from "../api/cart.api";

interface Props {
  itemId: number;
}

export const useCartItems = ({ itemId }: Props) => {
  const { updateCart } = useCart();

  const functionWrapper = useCallback(async (callback: () => Promise<void>) => {
    try {
      return await callback();
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleAddEtiketka = useCallback(async () => {
    return await functionWrapper(async () => {
      await addToCart(itemId, 1);
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
