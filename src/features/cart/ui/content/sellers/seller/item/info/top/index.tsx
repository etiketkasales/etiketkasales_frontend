"use client";
import React from "react";

import classes from "./top.module.scss";
import Price from "~/src/shared/ui/price/ui";
import Link from "next/link";

interface Props {
  title: string;
  price: string;
  old_price?: string;
  href: string;
}

export default function CartItemInfoTop({
  title,
  href,
  price,
  old_price,
}: Props) {
  return (
    <div
      className={`flex-row space-between gap-10 flex-start ${classes.container}`}
    >
      <Link
        href={href}
        rel="noopener noreferrer"
        className={`black text-18 semibold second-family ${classes.title}`}
      >
        {title}
      </Link>
      <Price
        price={price}
        old_price={old_price}
        needTransform={false}
        className={classes.price}
      />
    </div>
  );
}
