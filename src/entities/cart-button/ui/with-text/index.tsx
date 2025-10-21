import React from "react";
import { useCartItems } from "~/src/features/cart/lib/hooks/useCartItems.hook";
import { useCartButton } from "~/src/entities/cart-button/lib/hooks/useCartButton.hook";

import Button from "~/src/shared/ui/button";
import { ICommonCartButton } from "..";

interface Props extends ICommonCartButton {}

export default function CartButtonWithText({
  itemId,
  className,
  minQuantity,
  updateInfo,
}: Props) {
  const { handleAddEtiketka } = useCartItems({ itemId });
  const { handleButtonClick, loading } = useCartButton({ updateInfo });

  return (
    <Button
      typeButton="yellow"
      size="12"
      radius={12}
      onClick={async () =>
        await handleButtonClick(() => handleAddEtiketka(minQuantity || 1))
      }
      className={className}
      disabled={loading}
    >
      <span className="text-yellow-1000 heading h7">В корзину</span>
    </Button>
  );
}
