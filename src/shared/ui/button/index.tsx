"use client";
import React, { ElementType, useEffect } from "react";

import classes from "./button.module.scss";
import { useRouter } from "next/navigation";

export type ButtonTypeButtonT =
  | "ghost"
  | "yellow"
  | "light-yellow"
  | "white"
  | "blue"
  | "green"
  | "bg-gray"
  | "gray-1"
  | "border-bg";

interface Props<T extends ElementType>
  extends React.HTMLAttributes<HTMLButtonElement> {
  typeButton: ButtonTypeButtonT;
  size: string; //4-12 6-10 10; в пикселях
  radius?: number;
  needActiveScale?: boolean;
  className?: string;
  justifyCenter?: boolean;
  disabled?: boolean;
  as?: T;
  href?: string;
  ref?: React.Ref<HTMLButtonElement>;
}

export default function Button<T extends ElementType>({
  typeButton,
  size,
  radius,
  needActiveScale = true,
  onClick,
  className,
  justifyCenter = true,
  children,
  disabled,
  as,
  href,
  ref,
  ...rest
}: Props<T>) {
  const { prefetch, push } = useRouter();

  useEffect(() => {
    if (href) {
      prefetch(href);
    }
  }, [href, prefetch]);

  const sizeRender = () => {
    return `padding-${size}`;
  };

  const typeButtonRender = () => {
    return classes[typeButton];
  };

  const Tag = as || "button";

  return (
    <Tag
      onClick={(e) => {
        onClick?.(e);
        if (href) {
          push(href);
        }
      }}
      className={`${className} ${justifyCenter && "center-element"} ${classes.button} ${needActiveScale ? classes.activeScale : ""} ${sizeRender()} ${typeButtonRender()}`}
      {...rest}
      style={{
        borderRadius: radius ? `${radius}px` : undefined,
      }}
      disabled={disabled}
      ref={ref}
    >
      {children}
    </Tag>
  );
}
