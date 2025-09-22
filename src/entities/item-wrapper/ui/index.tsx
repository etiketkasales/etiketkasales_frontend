"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useWindowSize } from "react-use";

import classes from "./item-wrapper.module.scss";
import ItemWrapperTop from "./top";
import ItemWrapperCaption from "./caption";
import { EtiketkaI } from "../../etiketka/model/etiketka.interface";

interface Props {
  item: EtiketkaI;
}

export default function ItemWrapper({ item }: Props) {
  const { push } = useRouter();
  const { width } = useWindowSize();
  const [gap, setGap] = useState<string>("");

  useEffect(() => {
    setGap(width <= 460 ? "gap-2" : "gap-4");
  }, []);

  return (
    <li
      className={`${classes.container} flex-column ${gap} cursor flex-start`}
      onClick={() => push(`/etiketka/${item.url}`)}
    >
      <ItemWrapperTop item={item} image={item.cover_image} />
      <ItemWrapperCaption
        title={item.title}
        price={item.price}
        discountPrice={item.old_price}
      />
    </li>
  );
}
