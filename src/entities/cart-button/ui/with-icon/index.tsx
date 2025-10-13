import React from "react";
import classNames from "classnames";
import { useCartItems } from "~/src/features/cart/lib/hooks/useCartItems.hook";
import { useCartButton } from "~/src/entities/cart-button/lib/hooks/useCartButton.hook";

import classes from "./with-icon.module.scss";
import CartFill from "~/public/shared/cart-fill.svg";
import Container from "~/src/shared/ui/container/ui";
import { ICommonCartButton } from "..";

interface Props extends ICommonCartButton {}

export default function CartButtonWithIcon({
  product_id,
  className,
  updateInfo,
}: Props) {
  const { handleAddEtiketka } = useCartItems({ itemId: product_id });
  const { handleButtonClick } = useCartButton({ updateInfo });

  return (
    <Container
      bgColor={"yellow-500"}
      className={classNames(classes.container, className)}
      as="button"
      onClick={async () => await handleButtonClick(handleAddEtiketka)}
    >
      <CartFill />
    </Container>
  );
}
