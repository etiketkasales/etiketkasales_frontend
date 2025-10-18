"use client";
import React from "react";
import classNames from "classnames";
import { useTabsItem } from "~/src/widgets/tabs/lib/hooks/useTabsItem.hook";

import classes from "./item.module.scss";
import Button from "~/src/shared/ui/button";
import { TabsItemI } from "~/src/widgets/tabs/model/tabs.interface";
import { ICartItem } from "~/src/features/cart/model/cart.interface";

interface Props extends TabsItemI {
  cartItems: ICartItem[];
}

export default function TabsItem({ Icon, link, needDop, cartItems }: Props) {
  const { isActive, buttonClick, getDop } = useTabsItem(link, cartItems);

  return (
    <Button
      typeButton="ghost"
      size="0"
      className={classNames(classes.button, {
        [classes.active]: isActive,
      })}
      onClick={buttonClick}
      needActiveScale={false}
    >
      <Icon />
      {needDop && getDop(needDop) && (
        <span
          className={`text-14 semibold text-yellow-1000 second-family text-center ${classes.dop}`}
        >
          {needDop === "cart" ? cartItems?.length : cartItems?.length}
        </span>
      )}
    </Button>
  );
}
