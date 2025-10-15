import React from "react";

import classes from "../swiper-item.module.scss";
import Container from "~/src/shared/ui/container/ui";
import ImageContainer from "~/src/shared/ui/image-container/ui";

interface Props {
  image: string;
  name: string;
}

export default function ItemWrapperIcon({ image, name }: Props) {
  return (
    <Container
      bgColor="neutral-300"
      className={`${classes.icon} padding-16 radius-16`}
    >
      <ImageContainer
        src={image}
        width={24}
        height={24}
        alt={name}
        className="radius-16"
      />
    </Container>
  );
}
