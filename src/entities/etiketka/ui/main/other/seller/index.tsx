"use client";

import classes from "./seller.module.scss";
import SellerInfo from "~/src/shared/ui/seller-info/ui";

interface Props {
  sellerId: number;
}

export default function EtiketkaSeller({ sellerId }: Props) {
  return (
    <SellerInfo
      wrapperClassName={`padding-16 ${classes.container}`}
      sellerId={sellerId}
    />
  );
}
