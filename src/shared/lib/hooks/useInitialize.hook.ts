import { useCallback, useEffect } from "react";
import { useCart } from "~/src/features/cart/lib/hooks/useCart.hook";
import { useGetUser } from "~/src/features/user/lib/hooks/useGetUser.hook";

export const useInitialize = () => {
  const { handleGetUser } = useGetUser();
  const { updateCart } = useCart();

  const handleGetCities = useCallback(async () => {
    try {
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    handleGetCities();
    handleGetUser();
    updateCart();
  }, [handleGetCities, handleGetUser, updateCart]);
};
