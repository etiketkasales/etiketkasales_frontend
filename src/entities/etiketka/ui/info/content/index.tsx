"use client";

import EtiketkaInfoDescription from "./description";
import EtiketkaInDev from "./in-dev";
import EtiketkaInfoSpecs from "./specs";
import { CurrentIndexI, IEtiketka } from "~/src/entities/etiketka/model";

interface Props {
  currentIndex: CurrentIndexI;
  item: IEtiketka;
}

export default function EtiketkaInfoContent({ currentIndex, item }: Props) {
  switch (currentIndex) {
    default:
      return <EtiketkaInDev />;
    case "descr":
      return <EtiketkaInfoDescription description={item.description} />;
    case "specs":
      return <EtiketkaInfoSpecs specs={item.specifications} />;
  }
}
