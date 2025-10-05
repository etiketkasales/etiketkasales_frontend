import React from "react";

import BackIcon from "~/public/header/back-icon.svg";
import Button from "~/src/shared/ui/button";

interface Props {
  children: React.ReactNode;
  classNameBackButton?: string;
}

export default function HeaderWithBackMedia({
  children,
  classNameBackButton,
}: Props) {
  return (
    <>
      <Button
        typeButton="ghost"
        size="0"
        onClick={() => history.back()}
        className={classNameBackButton}
      >
        <BackIcon />
      </Button>
      {children}
    </>
  );
}
