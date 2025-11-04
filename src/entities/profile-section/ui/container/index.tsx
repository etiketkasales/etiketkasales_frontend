import React, { ElementType } from "react";
import classNames from "classnames";

import classes from "./profile-wrapper.module.scss";
import Container from "~/src/shared/ui/container/ui";

interface Props {
  children: React.ReactNode;
  className?: string;
  bgColor?: string;
  onClick?: () => void;
  as?: ElementType;
}

export default function ProfileContainer({
  children,
  className,
  bgColor,
  onClick,
  as,
}: Props) {
  return (
    <Container
      bgColor={bgColor}
      className={classNames(className, classes.container)}
      onClick={onClick}
      as={as}
    >
      {children}
    </Container>
  );
}
