"use client";
import React from "react";
import classNames from "classnames";

import classes from "./loader-circle.module.scss";

interface Props {
  radius: number;
  className?: string;
}

export default function LoaderCircle({ radius, className }: Props) {
  return (
    <div
      className={classNames(
        `absolute place-center ${classes.container}`,
        className,
      )}
      style={{
        borderRadius: `${radius}px`,
      }}
    >
      <span className={classes.loader}></span>
    </div>
  );
}
