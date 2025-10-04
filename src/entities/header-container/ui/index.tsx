import React from "react";
import classNames from "classnames";

import Container from "~/src/shared/ui/container/ui";

interface Props {
  children: React.ReactNode;
  bgColor?: string;
  className?: string;
  classNameContainer?: string;
}

export default function HeaderContainer({
  children,
  className,
  classNameContainer,
  bgColor,
}: Props) {
  return (
    <header className={classNames("header-container", className)}>
      <Container
        bgColor={bgColor}
        className={classNames("wrapper-header", classNameContainer)}
      >
        {children}
      </Container>
    </header>
  );
}
