import React from "react";
import classNames from "classnames";

import classes from "../swiper-item.module.scss";
import Container from "~/src/shared/ui/container/ui";
import ImageContainer from "~/src/shared/ui/image-container/ui";

interface Props {
  image: string;
}

export default function ItemWrapperIcon({ image }: Props) {
  return (
    <Container
      bgColor="neutral-300"
      className={classNames(
        `${classes.icon} padding-16 radius-16`,
        classes.icon,
      )}
    >
      <ImageContainer
        src={image}
        width={24}
        height={24}
        alt={""}
        className="radius-16"
      />
    </Container>
  );
}
