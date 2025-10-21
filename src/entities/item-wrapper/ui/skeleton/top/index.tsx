import React from "react";

import classes from "./skeleton-top.module.scss";
import ImageWrapper from "~/src/shared/ui/image-wrapper/ui";

export default function ItemSkeletonTop() {
  return (
    <ImageWrapper
      src={"/shared/image-src-plug.png"}
      width={222}
      height={222}
      alt=""
      className={classes.image}
    />
  );
}
