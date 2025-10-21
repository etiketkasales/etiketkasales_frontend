import React from "react";
import { IEtiketka } from "~/src/entities/etiketka/model";

import classes from "./item-wrapper-top.module.scss";
import CartButton from "~/src/entities/cart-button/ui";
import ImageWrapper from "~/src/shared/ui/image-wrapper/ui";

interface Props {
  item: IEtiketka;
  image: string;
  updateInfo: () => Promise<void>;
}

export default function ItemWrapperTop({ updateInfo, item, image }: Props) {
  return (
    <div className={`relative ${classes.container}`}>
      <ImageWrapper
        src={image ? image : ""}
        width={222}
        height={222}
        alt=""
        className={classes.image}
      />
      <CartButton
        className={classes.button}
        type="with_icon"
        itemId={item.id}
        quantity={item.cart_quantity}
        minQuantity={item.min_order_quantity}
        updateInfo={updateInfo}
      />
    </div>
  );
}
