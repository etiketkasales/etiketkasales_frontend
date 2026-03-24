"use client";
import React, { ElementType, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import classNames from "classnames";

import classes from "./button.module.scss";

export type ButtonTypeButtonT =
  | "ghost"
  | "yellow"
  | "white"
  | "blue"
  | "gray"
  | "yellow-200"
  | "red-border"
  | "gray-border"
  | "yellow-border";

interface Props<T extends ElementType>
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, "onClick" | "type"> {
  typeButton: ButtonTypeButtonT;
  /** HTML type у нативной кнопки (по умолчанию button, не submit) */
  /** HTML-атрибут нативной кнопки; по умолчанию `button` (не submit) */
  type?: "button" | "submit" | "reset";
  size?: string;
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
  onClick?: () => void | Promise<void>;
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
  type = "button",
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

  const nativeButtonType =
    Tag === "button" || as === undefined ? type : undefined;

  return (
    <Tag
      type={nativeButtonType}
      onClick={() => {
        if (customClickWithHref) {
          customClickWithHref();
        } else {
          void Promise.resolve(onClick?.()).catch((e) => console.error(e));
          if (href) {
            push(href);
          }
        }
      }}
      className={classNameLocal}
      style={{
        borderRadius: radius ? `${radius}px` : undefined,
        ...rest.style,
      }}
      disabled={disabled}
      ref={ref}
      {...rest}
    >
      {children}
    </Tag>
  );
}
