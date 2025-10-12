"use client";
import React from "react";

import EtiketkaInfoDescription from "./description";
import {
  CurrentIndexI,
  IEtiketka,
} from "~/src/entities/etiketka/model/etiketka.interface";

interface Props {
  currentIndex: CurrentIndexI;
  initProductInfo: IEtiketka;
}

export default function EtiketkaInfoContent({
  currentIndex,
  initProductInfo,
}: Props) {
  switch (currentIndex) {
    default:
    case "descr":
      return (
        <EtiketkaInfoDescription description={initProductInfo.description} />
      );
  }
}
