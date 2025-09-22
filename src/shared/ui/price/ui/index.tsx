import React from "react";

import classes from "./price.module.scss";

interface Props {
  price: number;
  old_price?: number;
  alignCenter?: boolean;
  needTransform?: boolean;
  className?: string;
}

export default function Price({
  price,
  old_price,
  alignCenter,
  needTransform = true,
  className,
}: Props) {
  return (
    <div
      className={`flex-row gap-6px${alignCenter ? " align-center" : " flex-end"} ${className}`}
    >
      <p
        className={`${old_price ? "text-green-700" : "text-neutral-700"} heading h6 text`}
      >
        {price} ₽
      </p>
      {old_price && (
        <p
          className={`text-neutral-600 heading h7 line-through ${needTransform && classes.sub}`}
        >
          {old_price} ₽
        </p>
      )}
    </div>
  );
}
