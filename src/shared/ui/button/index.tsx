import React from "react";

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
  | "border-bg";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  typeButton: ButtonTypeButtonT;
  size: string; //4-12 6-10 10; в пикселях
  radius?: number;
  needActiveScale?: boolean;
  className?: string;
  justifyCenter?: boolean;
  disabled?: boolean;
  as?: string;
}

export default function Button({
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
  ...rest
}: Props) {
  const sizeRender = () => {
    return `padding-${size}`;
  };

  const typeButtonRender = () => {
    return classes[typeButton];
  };

  if (as === "a") {
    return (
      <div
        className={`${className} ${justifyCenter && "center-element"} ${classes.button} ${needActiveScale ? classes.activeScale : ""} ${sizeRender()} ${typeButtonRender()}`}
        style={{
          borderRadius: `${radius}px`,
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${className} ${justifyCenter && "center-element"} ${classes.button} ${needActiveScale ? classes.activeScale : ""} ${sizeRender()} ${typeButtonRender()}`}
      {...rest}
      style={{
        borderRadius: `${radius}px`,
      }}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
