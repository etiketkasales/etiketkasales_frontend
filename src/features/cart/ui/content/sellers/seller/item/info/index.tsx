import React from "react";

import classes from "./seller-item.module.scss";
import ImageWrapper from "~/src/shared/ui/image-wrapper/ui";
import SellerItemDouble from "../actions/double";
import Price from "~/src/shared/ui/price/ui";

interface Props {
  image: string;
  name: string;
  deleteFromCart: () => Promise<void>;
  price: string;
  old_price: string | null;
}

export default function CartSellerItemInfo({
  image,
  name,
  deleteFromCart,
  price,
  old_price,
}: Props) {
  return (
    <div className={`flex-row ${classes.container}`}>
      <ImageWrapper
        src={image}
        alt={""}
        className={classes.image}
        width={120}
        height={120}
      />
      <div className={`flex-column ${classes.innerContainer}`}>
        <p className={`heading h6 text-neutral-1000 ${classes.text}`}>{name}</p>
        <SellerItemDouble
          deleteFromCart={deleteFromCart}
          containerClassName={classes.double}
        />
        <Price old_price={old_price} price={price} className={classes.price} />
      </div>
    </div>
  );
}
