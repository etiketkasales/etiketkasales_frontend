import React from "react";
import classNames from "classnames";

import classes from "./header-with-text.module.scss";
import HeaderWithBack from "~/src/entities/header-with-back/ui";

interface Props {
  text: string;
  customMediaClassName?: string;
  classNameBackButton?: string;
}

export default function HeaderWithText({
  text,
  customMediaClassName,
  classNameBackButton,
}: Props) {
  return (
    <HeaderWithBack
      className={classes.container}
      customMediaClassName={classNames(customMediaClassName, classes.media)}
      classNameBackButton={classNameBackButton}
    >
      <h3 className={`text-neutral-900 text-18 bold second-family text-center`}>
        {text}
      </h3>
    </HeaderWithBack>
  );
}
