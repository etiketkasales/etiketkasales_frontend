import React from "react";
import classNames from "classnames";

import classes from "./price.module.scss";

interface Props {
  price: number | string;
  old_price?: number | string;
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
  // cop = копейки
  const getPriceWithoutCop = (price: string | number) => {
    const strPrice = String(price);
    const [rubles, cops] = strPrice.split(".");
    const [cops1, cops2] = cops.split("");
    if (cops1 === "0" && cops2 === "0") {
      return rubles;
    }
    return strPrice;
  };

  return (
    <div
      className={classNames(
        `flex-row gap-6px ${alignCenter ? "align-center" : "flex-end"}`,
        className,
      )}
    >
      <p
        className={`${old_price ? "text-green-700" : "text-neutral-700"} heading h6 text`}
      >
        {getPriceWithoutCop(price)}&nbsp;₽
      </p>
      {old_price && (
        <p
          className={`text-neutral-600 heading h7 line-through ${needTransform && classes.sub}`}
        >
          {getPriceWithoutCop(old_price)}&nbsp;₽
        </p>
      )}
    </div>
  );
}
