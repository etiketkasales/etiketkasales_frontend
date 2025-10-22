import React from "react";
import classNames from "classnames";

import classes from "./filter-item-wrapper.module.scss";
import Container from "~/src/shared/ui/container/ui";

interface Props {
  type: "yellow" | "neutral";
  children: React.ReactNode;
  className?: string;
}

export default function CurrentFiltersItemWrapper({
  type,
  children,
  className,
}: Props) {
  return (
    <Container
      bgColor={type === "yellow" ? "yellow-200" : "neutral-100"}
      className={classNames(className, classes.container)}
    >
      {children}
    </Container>
  );
}
