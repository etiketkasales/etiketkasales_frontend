"use client";
import React from "react";

import classes from "./no-src.module.scss";

interface Props {
  width: number;
  height: number;
  radius: string;
}

export default function NoSrcImage({ width, height, radius }: Props) {
  return (
    <div
      className={classes.container}
      style={{
        maxWidth: `${width}px`,
        maxHeight: `${height}px`,
        borderRadius: radius,
      }}
    ></div>
  );
}
