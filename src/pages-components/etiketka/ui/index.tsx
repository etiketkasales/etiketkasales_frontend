"use client";
import React from "react";

import EtiketkaSection from "~/src/entities/etiketka/ui";
import PageWrapper from "~/src/entities/page-wrapper/ui";
import { IEtiketka } from "~/src/entities/etiketka/model/etiketka.interface";

interface Props {
  initProductInfo: IEtiketka;
}

export default function EtiketkaPage({ initProductInfo }: Props) {
  return (
    <PageWrapper>
      <EtiketkaSection initProductInfo={initProductInfo} />
    </PageWrapper>
  );
}
