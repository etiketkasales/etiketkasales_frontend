import React from "react";
import classNames from "classnames";

import classes from "./header-with-back.module.scss";
import HeaderDefault from "../../header-default/ui";
import HeaderWithBackMedia from "./media";

interface Props {
  children: React.ReactNode;
  classNameBackButton?: string;
  className?: string;
  flexDirection?: "row" | "column";
}

export default function HeaderWithBack({
  children,
  classNameBackButton,
  className,
  flexDirection,
}: Props) {
  return (
    <HeaderDefault
      flexDirection={flexDirection}
      className={classNames(className, classes.container)}
      mediaBgColor="neutral-100"
      CustomMediaHeader={
        <HeaderWithBackMedia classNameBackButton={classNameBackButton}>
          {children}
        </HeaderWithBackMedia>
      }
      needTranslate={false}
    />
  );
}
