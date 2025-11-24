"use client";
import React from "react";
import classNames from "classnames";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectCart } from "~/src/app/store/reducers/cart.slice";

import classes from "./functional.module.scss";
import CartWrapper from "~/src/features/cart/ui/wrapper";
import CheckboxInput from "~/src/shared/ui/inputs/checkbox";
import CartDeleteAll from "./delete-all";

interface Props {
  onCheckboxChange: (selectAll: boolean) => void;
  onDeleteClick: () => void;
  className?: string;
}

export default function CartFunctional({
  className,
  onCheckboxChange,
  onDeleteClick,
}: Props) {
  const { isAllSelected } = useAppSelector(selectCart);

  return (
    <CartWrapper
      className={classNames(
        `flex-row space-between gap-5`,
        className,
        classes.container,
      )}
    >
      <CheckboxInput
        label="Выбрать все"
        onChange={() => onCheckboxChange(!isAllSelected)}
        gap="10px"
        checked={isAllSelected}
        className={classes.checkbox}
      />
      <CartDeleteAll onClick={onDeleteClick} />
    </CartWrapper>
  );
}
