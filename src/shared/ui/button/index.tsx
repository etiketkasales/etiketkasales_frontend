"use client";
import React, { ElementType, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import classNames from "classnames";

import classes from "./button.module.scss";

export type ButtonTypeButtonT =
  | "ghost"
  | "yellow"
  | "light-yellow"
  | "white"
  | "blue"
  | "green"
  | "bg-gray"
  | "gray-1"
  | "border-bg"
  | "red-border";

interface Props<T extends ElementType>
  extends React.HTMLAttributes<HTMLButtonElement> {
  typeButton: ButtonTypeButtonT;
  size?: string; //4-12 6-10 10; в пикселях
  radius?: number;
  needActiveScale?: boolean;
  className?: string;
  justifyCenter?: boolean;
  disabled?: boolean;
  as?: T;
  href?: string;
  ref?: React.Ref<HTMLButtonElement>;
  blank?: boolean;
  customClickWithHref?: () => void;
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
  blank,
  customClickWithHref,
  ...rest
}: Props<T>) {
  const { prefetch, push } = useRouter();

  useEffect(() => {
    if (href) {
      prefetch(href);
    }
  }, [href, prefetch]);

  const classNameLocal = useMemo(
    () =>
      classNames(className, classes[typeButton], classes.button, {
        [`padding-${size}`]: size,
        [classes.activeScale]: needActiveScale,
        [classes.justifyCenter]: justifyCenter,
      }),
    [className, size, needActiveScale, justifyCenter, typeButton],
  );

  const Tag = as || "button";

  return (
    <Tag
      onClick={(e) => {
        if (customClickWithHref) {
          customClickWithHref();
        } else {
          onClick?.(e);
          if (href) {
            push(href);
          }
        }
      }}
      className={classNameLocal}
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
