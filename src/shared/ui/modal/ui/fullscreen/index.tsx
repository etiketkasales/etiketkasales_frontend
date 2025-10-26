import React from "react";
import classNames from "classnames";

import classes from "./fulscreen-modal.module.scss";
import Container from "~/src/shared/ui/container/ui";
import FullscreenModalTitle from "./heading";

interface Props {
  children: React.ReactNode;
  title: string;
  classNameTitle?: string;
  classNameContainer?: string;
  onClose: () => void;
}

export default function FullscreenModal({
  children,
  title,
  classNameTitle = "",
  classNameContainer,
  onClose,
}: Props) {
  return (
    <div
      className={classNames(
        classes.container,
        classNameContainer,
        "flex-column",
      )}
    >
      <FullscreenModalTitle
        classNameTitle={classNameTitle}
        title={title}
        onClose={onClose}
      />
      {children}
    </div>
  );
}
