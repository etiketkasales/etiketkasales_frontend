"use client";
import React from "react";
import { useRouter } from "next/navigation";

import classes from "./etiketka-info.module.scss";
import ImageContainer from "~/src/shared/ui/image-container";

interface Props {
  orderPrice: number;
  etiketkaUrl: string;
  etiketkaImage: string;
}

export default function ProfileOrderEtiketkaInfo({
  orderPrice,
  etiketkaUrl,
  etiketkaImage,
}: Props) {
  const { push } = useRouter();
  return (
    <div
      className="flex-column flex-end gap-6 cursor space-between"
      onClick={() => {
        push(`/etiketka/${etiketkaUrl}`);
      }}
    >
      <h4 className="text-20 bold second-family black">{orderPrice} ₽</h4>
      <ImageContainer
        src={etiketkaImage}
        width={70}
        height={70}
        alt="Карточка товара"
        radius={20}
      />
    </div>
  );
}
