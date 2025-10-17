import React from "react";
import classNames from "classnames";

import classes from "./cart-counter.module.scss";
import Container from "~/src/shared/ui/container/ui";
import CartCounterPlusMinus from "./plus-minus";
import { ICommonCartButton } from "..";

interface Props extends ICommonCartButton {}

export default function CartCounter({
  itemId,
  quantity,
  className,
  updateInfo,
}: Props) {
  const sharedProps = {
    itemId,
    quantity,
    updateInfo,
  };

  return (
    <Container
      bgColor={"neutral-200"}
      className={classNames(className, classes.container, `flex-row`)}
    >
      <CartCounterPlusMinus type={"minus"} {...sharedProps} />
      <span
        className={`heading h7 text-neutral-1000 text-center ${classes.count}`}
      >
        {quantity}
      </span>
      <CartCounterPlusMinus type={"plus"} {...sharedProps} />
    </Container>
  );
}
