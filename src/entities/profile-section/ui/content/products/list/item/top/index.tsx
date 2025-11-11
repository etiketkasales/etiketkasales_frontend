import React from "react";

import classes from "./product-top.module.scss";
import ImageWrapper from "~/src/shared/ui/image-wrapper/ui";
import ProfileProductButton from "./button";

interface Props {
  image: string;
  onButtonClick: () => void;
}

export default function ProfileProductTop({ image, onButtonClick }: Props) {
  return (
    <ImageWrapper
      className={classes.container}
      src={image}
      width={216}
      height={216}
    >
      <ProfileProductButton onClick={onButtonClick} />
    </ImageWrapper>
  );
}
