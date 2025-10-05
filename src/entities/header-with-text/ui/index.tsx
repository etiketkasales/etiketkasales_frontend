import React from "react";

import classes from "./header-with-text.module.scss";
import HeaderWithBack from "../../header-with-back/ui";

interface Props {
  text: string;
}

export default function HeaderWithText({ text }: Props) {
  return (
    <HeaderWithBack className={classes.container}>
      <h3 aria-hidden={true}></h3>
      <h3
        className={`text-neutral-900 text-18 bold second-family ${classes.text}`}
      >
        {text}
      </h3>
    </HeaderWithBack>
  );
}
