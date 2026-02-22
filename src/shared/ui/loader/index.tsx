"use client";
import classNames from "classnames";

import classes from "./loader-circle.module.scss";

interface Props {
  radius: number;
  needCircle?: boolean;
  className?: string;
  size?: number;
}

export default function Loader({
  radius,
  className,
  needCircle = true,
  size = 30,
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
      {needCircle && (
        <span
          className={classes.loader}
          style={{ width: `${size}px`, height: `${size}px` }}
        ></span>
      )}
    </div>
  );
}
