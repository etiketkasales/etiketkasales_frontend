"use client";
import React, { useEffect, useState } from "react";
import { useWindowSize } from "react-use";

import classes from "./body.module.scss";
import ItemWrapper from "~/src/entities/item-wrapper/ui";
import { EtiketkaI } from "~/src/entities/etiketka/model/etiketka.interface";

interface Props {
  arrayProducts: Array<EtiketkaI>;
}

export default function SectionWrapperBody({ arrayProducts }: Props) {
  const { width } = useWindowSize();
  const [gap, setGap] = useState<string>("");

  useEffect(() => {
    setGap(width > 460 ? "gap-5" : "gap-3-4");
  }, []);
  return (
    <ul className={`${gap} ${classes.container}`}>
      {arrayProducts.slice(0, width > 768 ? 5 : 4).map((item, index) => {
        return <ItemWrapper key={`${item.id}-${index}`} item={item} />;
      })}
    </ul>
  );
}
