"use client";
import React from "react";
import { useWindowSize } from "react-use";

import ImageContainer from "~/src/shared/ui/image-container/ui";
import LinkContainer from "~/src/shared/ui/link-container/ui";
import { IAdv } from "~/src/shared/ui/advs/model/advs.interface";

interface Props extends IAdv {}

export default function AdvsSlide({ image_url, link }: Props) {
  const { width } = useWindowSize();

  return (
    <LinkContainer link={link}>
      <ImageContainer
        src={image_url ? image_url : "/adv/no-add-banner.png"}
        width={1240}
        height={width <= 360 ? 200 : 464}
        alt="Рекламный баннер"
      />
    </LinkContainer>
  );
}
