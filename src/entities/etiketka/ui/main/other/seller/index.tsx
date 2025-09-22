"use client";
import React from "react";

import classes from "./seller.module.scss";
import EtiketkaMainContainer from "~/src/entities/etiketka/ui/container";
import SellerInfoContainer from "~/src/shared/ui/seller-info/ui";

interface Props {
  sellerId: number;
}

export default function EtiketkaSeller({ sellerId }: Props) {
  return (
    <EtiketkaMainContainer className={`padding-16 ${classes.container}`}>
      <SellerInfoContainer sellerId={sellerId} gap={12} />
    </EtiketkaMainContainer>
  );
}
