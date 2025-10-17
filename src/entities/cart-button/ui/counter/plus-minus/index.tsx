import React from "react";
import classNames from "classnames";
import { useCartItems } from "~/src/features/cart/lib/hooks/useCartItems.hook";
import { useCartButton } from "~/src/entities/cart-button/lib/hooks/useCartButton.hook";

import classes from "./plus-minus.module.scss";
import Plus from "~/public/cart/plus.svg";
import Minus from "~/public/cart/minus.svg";
import Button from "~/src/shared/ui/button";

interface Props {
  type: "plus" | "minus";
  quantity: number;
  itemId: number;
  updateInfo?: () => Promise<void>;
}

const icons = {
  plus: Plus,
  minus: Minus,
};

export default function CartCounterPlusMinus({
  type,
  quantity,
  itemId,
  updateInfo,
}: Props) {
  const { handleUpdateEtiketka } = useCartItems({ itemId });
  const { handleButtonClick } = useCartButton({ updateInfo });
  const Icon = icons[type];
  const isMinus = type === "minus";
  return (
    <Button
      typeButton="ghost"
      size="0"
      onClick={async () =>
        await handleButtonClick(
          async () => await handleUpdateEtiketka(quantity + (isMinus ? -1 : 1)),
        )
      }
      className={classNames({
        [classes.disabled]: isMinus && quantity === 1,
      })}
      disabled={isMinus && quantity === 1}
    >
      <Icon />
    </Button>
  );
}
