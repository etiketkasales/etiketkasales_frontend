"use client";
import React from "react";

import classes from "./loader-circle.module.scss";

interface Props {
  radius: number;
}

export default function LoaderCircle({ radius }: Props) {
  return (
    <div
      className={`absolute place-center ${classes.container}`}
      style={{
        borderRadius: `${radius}px`,
      }}
    >
      <span className={classes.loader}></span>
    </div>
  );
}
