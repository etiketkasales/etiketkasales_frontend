import React from "react";
import classNames from "classnames";

import classes from "./fs-modal-title.module.scss";
import Icon from "~/public/modal/chevron-compact-left.svg";
import Container from "~/src/shared/ui/container/ui";
import Button from "~/src/shared/ui/button";

interface Props {
  title: string;
  onClose: () => void;
  className?: string;
}

export default function FullscreenModalTitle({
  title,
  onClose,
  className,
}: Props) {
  return (
    <Container className={classNames(className, classes.container)}>
      <div className={`relative ${classes.content}`}>
        <h2 className="heading h6 text-center text-neutral-900">{title}</h2>
        <Button
          typeButton="ghost"
          size="0"
          onClick={onClose}
          className={classes.button}
        >
          <Icon />
        </Button>
      </div>
    </Container>
  );
}
