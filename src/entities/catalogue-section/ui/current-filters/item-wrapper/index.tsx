import React from "react";
import classNames from "classnames";

import classes from "./filter-item-wrapper.module.scss";
import Container from "~/src/shared/ui/container/ui";

interface Props {
  type: "yellow" | "neutral";
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  onClick?: () => void;
}

export default function CurrentFiltersItemWrapper({
  type,
  children,
  className,
  as,
  onClick,
}: Props) {
  return (
    <Container
      bgColor={type === "yellow" ? "yellow-200" : "neutral-100"}
      className={classNames(className, classes.container)}
      as={as}
      onClick={onClick}
    >
      {children}
    </Container>
  );
}
