import React from "react";
import classNames from "classnames";

import classes from "./fullscreen-container.module.scss";
import CloseIcon from "~/public/modal/chevron-compact-left.svg";
import Container from "~/src/shared/ui/container/ui";
import Button from "~/src/shared/ui/button";

interface Props {
  classNameTitle: string;
  title: string;
  onClose: () => void;
}

export default function FullscreenModalTitle({
  classNameTitle,
  title,
  onClose,
}: Props) {
  return (
    <Container className={classNames(classes.container)}>
      <h3 className={classes.title}>
        {title}
        <Button
          typeButton="ghost"
          size="0"
          onClick={onClose}
          className={classes.close}
        >
          <CloseIcon />
        </Button>
      </h3>
    </Container>
  );
}
