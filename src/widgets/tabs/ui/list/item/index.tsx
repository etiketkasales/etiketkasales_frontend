import React from "react";
import { useRouter } from "next/navigation";

import classes from "./item.module.scss";
import Button from "~/src/shared/ui/button";
import { TabsItemI } from "~/src/widgets/tabs/model/tabs.interface";
import { EtiketkaI } from "~/src/entities/etiketka/model/etiketka.interface";

interface Props extends TabsItemI {
  cartItems: EtiketkaI[];
  favouriteItems: EtiketkaI[];
}

export default function TabsItem({
  Icon,
  link,
  needDop,
  cartItems,
  favouriteItems,
}: Props) {
  const { push } = useRouter();

  const getActiveForm = () => {
    if (window.location.pathname === link) {
      return classes.active;
    }
  };

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
        return getBool(favouriteItems);
    }
  };

  return (
    <Button
      typeButton="ghost"
      size="0"
      className={`${classes.container} ${getActiveForm()}`}
      onClick={() => {
        push(link);
      }}
      needActiveScale={false}
    >
      <Icon />
      {needDop && getDop(needDop) && (
        <span
          className={`text-14 semibold yellow-dark-2 second-family text-center ${classes.dop}`}
        >
          {needDop === "cart" ? cartItems.length : favouriteItems.length}
        </span>
      )}
    </Button>
  );
}
