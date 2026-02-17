"use client";

import classes from "./wrapper.module.scss";
import Container from "~/src/shared/ui/container/ui";
import classNames from "classnames";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function CartWrapper({ children, className }: Props) {
  return (
    <Container className={classNames(className, classes.container)}>
      {children}
    </Container>
  );
}
