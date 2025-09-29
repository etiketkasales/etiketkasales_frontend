import React, { ElementType, forwardRef } from "react";

import classNames from "classnames";
import { PolymorphicProps } from "~/src/shared/model/shared.interface";

interface ContainerOwnProps {
  bgColor?: string;
}

type ContainerProps<T extends ElementType> = PolymorphicProps<
  T,
  ContainerOwnProps
>;

export const Container = forwardRef(
  <T extends ElementType = "div">(
    {
      as,
      bgColor = "neutral-100",
      className,
      children,
      ...rest
    }: ContainerProps<T>,
    ref: React.Ref<React.ComponentPropsWithRef<T>["ref"]>,
  ) => {
    const Tag = as || "div";

    return (
      <Tag
        ref={ref as React.Ref<any>}
        className={classNames(className, {
          [`container-${bgColor}`]: bgColor,
        })}
        {...rest}
      >
        {children}
      </Tag>
    );
  },
);

Container.displayName = "Container";

export default Container;
