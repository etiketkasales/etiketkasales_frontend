import React from "react";

import classes from "./header.module.scss";
import ImageWrapper from "~/src/shared/ui/image-wrapper/ui";
import RadioButton from "~/src/shared/ui/radio-button/ui";

interface Props {
  image: string;
  isActive: boolean;
}

export default function DeliveryMethodHeader({ image, isActive }: Props) {
  return (
    <ImageWrapper
      src={image}
      width={40}
      height={40}
      className={"flex-row flex-start gap-4 space-between"}
      imgClassName={classes.image}
      needDummy={false}
    >
      <RadioButton isActive={isActive} />
    </ImageWrapper>
  );
}
