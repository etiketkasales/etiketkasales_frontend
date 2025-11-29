import React from "react";
import classNames from "classnames";

import classes from "./price.module.scss";
import StringUtils from "~/src/shared/lib/utils/string.util";

interface Props {
  price: number | string;
  old_price?: number | string | null;
  alignCenter?: boolean;
  needTransform?: boolean;
  className?: string;
  priceSize?: string;
  oldPriceSize?: string;
}

export default function Price({
  price,
  old_price,
  alignCenter,
  needTransform = true,
  className,
  priceSize = "h6",
  oldPriceSize = "h7",
}: Props) {
  return (
    <div
      className={classNames(
        `flex-row gap-6px ${alignCenter ? "align-center" : "flex-end"}`,
        className,
      )}
    >
      <p
        className={classNames(
          `${old_price ? "text-green-700" : "text-neutral-700"} heading`,
          priceSize,
        )}
      >
        {StringUtils.formatPrice(price)}&nbsp;₽
      </p>
      {old_price && (
        <p
          className={classNames(
            `text-neutral-600 heading line-through ${needTransform && classes.sub}`,
            oldPriceSize,
          )}
        >
          {StringUtils.formatPrice(old_price)}&nbsp;₽
        </p>
      )}
    </div>
  );
}
