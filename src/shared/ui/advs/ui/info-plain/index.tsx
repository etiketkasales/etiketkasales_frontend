"use client";
import React from "react";
import classNames from "classnames";

import classes from "./info-plain.module.scss";
import Info2Circle from "~/public/adv/info2-circle.svg";
import Container from "~/src/shared/ui/container/ui";

interface Props {
  needText?: boolean;
  className?: string;
  classNameIcon?: string;
}

export default function InfoPlain({
  needText = true,
  className,
  classNameIcon,
}: Props) {
  return (
    <Container
      bgColor={"neutral-1000"}
      className={classNames(
        `absolute align-center flex-row`,
        classes.container,
        className,
      )}
      title="Реклама"
    >
      <Info2Circle className={classNames(classes.icon, classNameIcon)} />
      {needText && <p className="heading h8 text-neutral-100">Реклама</p>}
    </Container>
  );
}
