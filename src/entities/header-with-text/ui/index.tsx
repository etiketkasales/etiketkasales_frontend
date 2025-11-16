import React from "react";

import classes from "./header-with-text.module.scss";
import HeaderWithBack from "~/src/entities/header-with-back/ui";
import classNames from "classnames";

interface Props {
  text: string;
  customMediaClassName?: string;
}

export default function HeaderWithText({ text, customMediaClassName }: Props) {
  return (
    <HeaderWithBack
      className={classes.container}
      customMediaClassName={classNames(customMediaClassName, classes.media)}
    >
      <h3 className={`text-neutral-900 text-18 bold second-family text-center`}>
        {text}
      </h3>
    </HeaderWithBack>
  );
}
