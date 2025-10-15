import React from "react";

import classes from "../swiper-item.module.scss";

interface Props {
  text: string;
}

export default function ItemWrapperText({ text }: Props) {
  return (
    <p
      className={`body-text m text-neutral-700 no-select text-center ${classes.text}`}
    >
      {text}
    </p>
  );
}
