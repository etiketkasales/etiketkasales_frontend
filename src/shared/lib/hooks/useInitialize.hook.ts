import { useEffect, useRef } from "react";
import { useAppDispatch } from "~/src/app/store/hooks";
import { clearCart, initializeCart } from "~/src/app/store/reducers/cart.slice";
import {
  clearFavourites,
  initializeFavourites,
} from "~/src/app/store/reducers/favourites.slice";
import { setNavigation } from "~/src/app/store/reducers/navigation.slice";
import { useGetUser } from "~/src/features/user/lib/hooks/useGetUser.hook";
import { getCities } from "~/src/shared/lib/api";

export const useInitialize = () => {
  const dispatch = useAppDispatch();
  const { handleGetUser } = useGetUser();
  const userId = 10;
  const lastUser = useRef<number>(0);

  const handleGetCities = async () => {
    try {
      const response = await getCities();
      if (!response) return;
      dispatch(setNavigation({ cities: response.map((i) => i.name) }));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleGetCities();
    handleGetUser(userId.toString());
  }, []);

  useEffect(() => {
    if (lastUser.current !== userId && lastUser.current !== 0) {
      dispatch(clearCart());
      dispatch(clearFavourites());
    }
    dispatch(initializeCart(userId));
    dispatch(initializeFavourites(userId));

    lastUser.current = userId;
  }, [userId]);
};
