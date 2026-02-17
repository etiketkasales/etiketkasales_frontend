"use client";

import classes from "./user-image.module.scss";
import Person from "~/public/profile/person-fill.svg";
import ImageWrapper from "../image-wrapper/ui";

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
    <ImageWrapper
      src={src}
      width={width}
      height={height}
      className={classes.container}
      alt=""
    />
  );
}
