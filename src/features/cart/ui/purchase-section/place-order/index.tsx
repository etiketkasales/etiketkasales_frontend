"use client";
import Link from "next/link";
import React from "react";

import classes from "./place-order.module.scss";
import Button from "~/src/shared/ui/button";

interface ButtonI {
  title: string;
  type: "yellow" | "border-bg";
  link: string;
}

export default function CartPlaceOrder() {
  const buttons: ButtonI[] = [
    {
      title: "Перейти к оформлению",
      type: "yellow",
      link: "/order",
    },
    {
      title: "Купить как юрлицо",
      type: "border-bg",
      link: "/order/company",
    },
  ];

  return (
    <div className="flex-column gap-10px">
      {buttons.map((item, index) => {
        return (
          <Button
            key={`${item.title}-${index}`}
            as="a"
            typeButton={item.type}
            size="12"
            radius={12}
            className={classes.button}
            href={item.link}
          >
            <span className="text-16 black second-family semibold">
              {item.title}
            </span>
          </Button>
        );
      })}
    </div>
  );
}
