import React from "react";
import classNames from "classnames";

interface Props {
  title: string;
  titleClassName?: string;
  value: string;
  valueClassName?: string;
  containerClassName?: string;
}

export default function OrderSummaryPricesItem({
  title,
  titleClassName,
  value,
  valueClassName,
  containerClassName,
}: Props) {
  return (
    <div
      className={classNames(`flex-row space-between gap-5`, containerClassName)}
    >
      <p className={titleClassName}>{title}</p>
      <p className={valueClassName}>{value}</p>
    </div>
  );
}
