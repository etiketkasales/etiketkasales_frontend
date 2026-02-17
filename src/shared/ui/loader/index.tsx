"use client";

import classNames from "classnames";

import classes from "./loader-circle.module.scss";

interface Props {
  radius: number;
  needCircle?: boolean;
  className?: string;
}

export default function Loader({
  radius,
  className,
  needCircle = true,
}: Props) {
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
      {needCircle && <span className={classes.loader}></span>}
    </div>
  );
}
