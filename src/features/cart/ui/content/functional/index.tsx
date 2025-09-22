"use client";
import React from "react";
import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import {
  selectCart,
  toggleSelectAll,
} from "~/src/app/store/reducers/cart.slice";

import classes from "./functional.module.scss";
import CartWrapper from "~/src/features/cart/ui/wrapper";
import CheckboxInput from "~/src/shared/ui/inputs/checkbox";
import CartDeleteAll from "./delete-all";

interface Props {
  className?: string;
}

export default function CartFunctional({ className }: Props) {
  const dispatch = useAppDispatch();
  const { isAllSelected } = useAppSelector(selectCart);

  return (
    <CartWrapper
      padding="20"
      className={`flex-row space-between gap-5 ${classes.container} ${className}`}
    >
      <CheckboxInput
        label="Выбрать все"
        onChange={() => dispatch(toggleSelectAll())}
        gap="10px"
        checked={isAllSelected}
        className={classes.checkbox}
      />
      <CartDeleteAll />
    </CartWrapper>
  );
}
