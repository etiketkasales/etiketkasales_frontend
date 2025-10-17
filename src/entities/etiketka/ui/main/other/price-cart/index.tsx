"use client";
import React from "react";

import classes from "./price-cart.module.scss";
import EtiketkaMainContainer from "~/src/entities/etiketka/ui/container";
import Price from "~/src/shared/ui/price/ui";
import CartButton from "~/src/entities/cart-button/ui";
import { IEtiketka } from "~/src/entities/etiketka/model/etiketka.interface";

interface Props {
  item: IEtiketka;
  updateInfo: () => Promise<void>;
}

export default function EtiketkaPriceCart({ item, updateInfo }: Props) {
  return (
    <EtiketkaMainContainer
      className={`flex-column gap-5 padding-16 ${classes.container}`}
    >
      <Price price={item.price} old_price={item.old_price} />
      <div className="flex-row gap-10px align-center">
        <CartButton
          itemId={item.id}
          quantity={item.quantity}
          type="with_text"
          className={classes.button}
          updateInfo={updateInfo}
        />
      </div>
    </EtiketkaMainContainer>
  );
}
