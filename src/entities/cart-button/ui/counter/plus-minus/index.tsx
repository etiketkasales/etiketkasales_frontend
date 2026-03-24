"use client";
import classNames from "classnames";
import { useCartItems } from "~/src/features/cart/lib/hooks/useCartItems.hook";
import { useCartButton } from "~/src/entities/cart-button/lib/hooks";

import classes from "./plus-minus.module.scss";
import Plus from "~/public/cart/plus.svg";
import Minus from "~/public/cart/minus.svg";
import Button from "~/src/shared/ui/button";
import { normalizeLineQuantity } from "~/src/features/cart/lib/utils";

interface Props {
  type: "plus" | "minus";
  quantity: number | string;
  min: number | string;
  max: number | string;
  itemId: number | string;
  updateInfo?: () => Promise<void>;
}

const icons = {
  plus: Plus,
  minus: Minus,
};

export default function CartCounterPlusMinus({
  type,
  quantity,
  min,
  max,
  itemId,
  updateInfo,
}: Props) {
  const { handleUpdateEtiketka } = useCartItems({ itemId });
  const { handleButtonClick, loading } = useCartButton({ updateInfo });
  const Icon = icons[type];
  const isMinus = type === "minus";
  const qty = Math.floor(Number(quantity)) || 0;
  const minN = Math.max(1, Math.floor(Number(min)) || 1);
  const maxNum =
    max != null && !(typeof max === "string" && max === "")
      ? Number(max)
      : NaN;
  const atMax =
    !isMinus &&
    Number.isFinite(maxNum) &&
    maxNum > 0 &&
    qty >= maxNum;
  const isDisabled = loading || (isMinus && qty <= minN) || atMax;

  return (
    <Button
      typeButton="ghost"
      size="0"
      onClick={async () => {
        if (!isDisabled) {
          const next = normalizeLineQuantity(
            qty + (isMinus ? -1 : 1),
          );
          await handleButtonClick(async () => {
            await handleUpdateEtiketka(next);
          });
        }
      }}
      className={classNames({
        [classes.disabled]: isDisabled,
      })}
      disabled={isDisabled}
    >
      <Icon />
    </Button>
  );
}
