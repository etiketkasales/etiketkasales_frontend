import { useCallback, useEffect } from "react";
import { useAppDispatch } from "~/src/app/store/hooks";
import { setUser } from "~/src/app/store/reducers/user.slice";
import { useCart } from "~/src/features/cart/lib/hooks/useCart.hook";
import { useFiltersInit } from "~/src/features/filters/lib/hooks";
import { useUser } from "~/src/features/user/lib/hooks/useUser.hook";

export const useInitialize = () => {
  const dispatch = useAppDispatch();
  useFiltersInit();
  const { handleGetUser } = useUser();
  const { updateCart } = useCart();

  const handleGetCities = useCallback(async () => {
    try {
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    handleGetCities();
    updateCart();
    let remember = false;
    if (typeof window !== "undefined") {
      remember = localStorage.getItem("needRemember") === "true";
      dispatch(setUser({ needRemember: remember }));
    }
    if (remember) {
      handleGetUser();
    } else {
      dispatch(setUser({ isLoggedIn: false }));
    }
  }, [handleGetCities, handleGetUser, updateCart, dispatch]);
};
