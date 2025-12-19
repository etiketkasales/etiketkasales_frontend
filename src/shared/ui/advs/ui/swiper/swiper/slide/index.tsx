"use client";
import React from "react";
import { useWindowSize } from "react-use";

import classes from "./slide.module.scss";
import LinkContainer from "~/src/shared/ui/link-container/ui";
import ImageWrapper from "~/src/shared/ui/image-wrapper/ui";
import { IAdv } from "~/src/shared/ui/advs/model/advs.interface";

interface Props extends IAdv {}

export default function AdvsSlide({ image_url, link }: Props) {
  const { width } = useWindowSize();

  return (
    <LinkContainer link={link}>
      <ImageWrapper
        src={image_url ? image_url : "/adv/no-add-banner.png"}
        width={1240}
        height={width <= 420 ? 200 : 464}
        alt="Рекламный баннер"
        className={classes.image}
        priority
      />
    </LinkContainer>
  );
}
