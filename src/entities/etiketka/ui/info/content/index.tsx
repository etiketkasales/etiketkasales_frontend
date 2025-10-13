"use client";
import React from "react";

import EtiketkaInfoDescription from "./description";
import {
  CurrentIndexI,
  IEtiketka,
} from "~/src/entities/etiketka/model/etiketka.interface";

interface Props {
  currentIndex: CurrentIndexI;
  item: IEtiketka;
}

export default function EtiketkaInfoContent({ currentIndex, item }: Props) {
  switch (currentIndex) {
    default:
    case "descr":
      return <EtiketkaInfoDescription description={item.description} />;
  }
}
