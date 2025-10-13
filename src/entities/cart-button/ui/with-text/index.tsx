import React from "react";
import { useCartItems } from "~/src/features/cart/lib/hooks/useCartItems.hook";
import { useCartButton } from "~/src/entities/cart-button/lib/hooks/useCartButton.hook";

import Button from "~/src/shared/ui/button";
import { ICommonCartButton } from "..";

interface Props extends ICommonCartButton {}

export default function CartButtonWithText({
  product_id,
  className,
  updateInfo,
}: Props) {
  const { handleAddEtiketka } = useCartItems({ itemId: product_id });
  const { handleButtonClick } = useCartButton({ updateInfo });

  return (
    <Button
      typeButton="yellow"
      size="12"
      radius={12}
      onClick={async () => await handleButtonClick(handleAddEtiketka)}
      className={className}
    >
      <span className="text-yellow-1000 heading h7">В корзину</span>
    </Button>
  );
}
