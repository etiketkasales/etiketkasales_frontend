import { useCallback, useEffect } from "react";
import { useAppDispatch } from "~/src/app/store/hooks";
import { setUser } from "~/src/app/store/reducers/user.slice";
import { useCart } from "~/src/features/cart/lib/hooks/useCart.hook";
import { useGetUser } from "~/src/features/user/lib/hooks/useGetUser.hook";
import CookieUtils from "../utils/cookies.utils";
import JwtUtils from "../utils/jwt.utils";

export const useInitialize = () => {
  const dispatch = useAppDispatch();
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
    updateCart();
    let remember = false;
    if (typeof window !== "undefined") {
      remember = localStorage.getItem("needRemember") === "true";
      dispatch(setUser({ needRemember: remember }));
    }
    const token = CookieUtils.getCookie("auth_token");
    const isLoggedIn = token && !JwtUtils.isExpiredToken(token);

    if (remember && isLoggedIn) {
      handleGetUser();
      dispatch(setUser({ isLoggedIn: true }));
    }
  }, [handleGetCities, handleGetUser, updateCart, dispatch]);
};
