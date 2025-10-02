import React, { ElementType, forwardRef } from "react";
import classNames from "classnames";

interface ContainerOwnProps {
  bgColor?: string | null;
}

type PolymorphicProps<T extends ElementType, P> = P &
  Omit<React.ComponentPropsWithoutRef<T>, keyof P | "as"> & {
    as?: T;
  };

const ContainerBase = <T extends ElementType = "div">(
  {
    as,
    bgColor = "neutral-100",
    className,
    children,
    ...rest
  }: PolymorphicProps<T, ContainerOwnProps>,
  ref: React.Ref<Element>,
) => {
  const Tag = as || "div";

  return (
    <Tag
      ref={ref as any}
      className={classNames(className, {
        [`container-${bgColor}`]: bgColor,
      })}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export const Container = forwardRef(ContainerBase) as <
  T extends ElementType = "div",
>(
  props: PolymorphicProps<T, ContainerOwnProps> & {
    ref?: React.Ref<Element>;
  },
) => React.ReactElement | null;

export default Container;
