"use client";
import React from "react";
import { useCartItems } from "~/src/features/cart/lib/hooks/useCartItems.hook";

import Button from "~/src/shared/ui/button";
import { EtiketkaI } from "~/src/entities/etiketka/model/etiketka.interface";

interface Props {
  className?: string;
  item?: EtiketkaI;
}

export default function AddEtiketkaButton({ className, item }: Props) {
  const { handleAddEtiketka, handleDeleteEtiketka, isInCart } = useCartItems({
    item,
  });

  return (
    <Button
      typeButton={"yellow"}
      size="12"
      radius={12}
      className={`${className}`}
      onClick={() => {
        if (isInCart) {
          handleDeleteEtiketka(item?.id);
        } else {
          handleAddEtiketka();
        }
      }}
    >
      <span className="black semibold text-16 second-family">
        В корзин{isInCart ? `е (${isInCart})` : "у"}
      </span>
    </Button>
  );
}
