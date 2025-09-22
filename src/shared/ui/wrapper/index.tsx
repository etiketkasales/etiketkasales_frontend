import React from "react";

export interface IWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  color?: string;
  padding?: string;
  radius?: number;
  className?: string;
}

interface Props extends IWrapperProps {}

export default function Wrapper({
  children,
  color,
  padding,
  radius,
  className,
  ...rest
}: Props) {
  return (
    <div
      className={`container-${color}`}
      style={{
        padding: padding ?? "",
        borderRadius: radius ?? `${radius}px`,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
