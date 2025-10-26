"use client";
import React from "react";

import classes from "./user-image.module.scss";
import Person from "~/public/profile/person-fill.svg";
import ImageContainer from "../image-container/ui";

interface Props {
  src: string | null;
  width: number;
  height: number;
}

export default function UserImage({ src, width, height }: Props) {
  if (!src) {
    return (
      <div
        className={`place-center ${classes.no_src_container} cursor`}
        style={{
          width: `${width}px`,
          height: `${height}px`,
        }}
      >
        <Person />
      </div>
    );
  }

  return (
    <ImageContainer
      src={src}
      width={width}
      height={height}
      className={classes.container}
      alt="User image"
      radius={"50%"}
    />
  );
}
