import React from "react";
import classNames from "classnames";

import classes from "./back-media.module.scss";
import BackIcon from "~/public/header/back-icon.svg";
import Button from "~/src/shared/ui/button";

interface Props {
  children: React.ReactNode;
  classNameBackButton?: string;
  onBackClick?: () => void;
}

export default function HeaderWithBackMedia({
  children,
  classNameBackButton,
  onBackClick,
}: Props) {
  return (
    <div className={`relative`}>
      <Button
        typeButton="ghost"
        size="0"
        onClick={() => {
          if (onBackClick) {
            onBackClick();
          } else {
            history.back();
          }
        }}
        className={classNames(classNameBackButton, classes.button)}
      >
        <BackIcon />
      </Button>
      {children}
    </div>
  );
}
