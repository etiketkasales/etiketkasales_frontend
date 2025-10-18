import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ICartItem } from "~/src/features/cart/model/cart.interface";

export const useTabsItem = (link: string, cartItems: ICartItem[]) => {
  const { push, prefetch } = useRouter();
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.pathname === link) {
      setIsActive(true);
    }
  }, [link]);

  useEffect(() => {
    prefetch(link);
  }, [link, prefetch]);

  const getBool = (items: any[]) => {
    if (items.length > 0) {
      return true;
    }
    return false;
  };

  const getDop = (needDop: "cart" | "favourites") => {
    switch (needDop) {
      default:
      case "cart":
        return getBool(cartItems);
      case "favourites":
        return getBool(cartItems);
    }
  };

  const buttonClick = () => {
    push(link);
  };

  return {
    getDop,
    isActive,
    buttonClick,
  };
};
