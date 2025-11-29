"use client";
import React from "react";
import { useEtiketka } from "~/src/entities/etiketka/lib/hooks/useEtiketka.hook";

import EtiketkaSection from "~/src/entities/etiketka/ui";
import PageWrapper from "~/src/entities/page-wrapper/ui";
import EtiketkaHeader from "~/src/entities/etiketka-header/ui";
import EtiketkaTabsButton from "./tabs-button";
import { IEtiketka } from "~/src/entities/etiketka/model";

interface Props {
  initProductInfo: IEtiketka;
}

export default function EtiketkaPage({ initProductInfo }: Props) {
  const { loading, productInfo, updateInfo } = useEtiketka({
    initProductInfo,
  });

  return (
    <PageWrapper
      TabsButton={
        <EtiketkaTabsButton
          itemId={productInfo.id}
          quantity={productInfo.cart_quantity}
          min={productInfo.min_order_quantity}
          max={productInfo.stock_quantity}
          updateInfo={updateInfo}
        />
      }
      CustomHeader={<EtiketkaHeader />}
      popTabsList
    >
      <EtiketkaSection
        productInfo={productInfo}
        loading={loading}
        updateInfo={updateInfo}
      />
    </PageWrapper>
  );
}
