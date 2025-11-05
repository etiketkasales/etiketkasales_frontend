import React from "react";
import classNames from "classnames";
import { useModal } from "~/src/shared/ui/modals/lib/hooks";

import classes from "./modal.module.scss";
import Container from "../../../container/ui";
import ModalTitle from "../title";
import { IModalBaseProps } from "~/src/shared/ui/modals/model";

interface Props extends IModalBaseProps {
  wrapperClassName?: string;
  containerClassName?: string;
  bgColor?: string;
  titleClassName?: string;
  titleTextClassName?: string;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  title,
  customClickOutside,
  wrapperClassName,
  containerClassName,
  bgColor,
  titleClassName,
  titleTextClassName,
}: Props) {
  const { contentRef } = useModal({ isOpen, onClose, customClickOutside });

  return (
    <div className={classNames(wrapperClassName, classes.wrapper)}>
      <Container
        ref={contentRef}
        bgColor={bgColor}
        className={classNames(containerClassName)}
      >
        <ModalTitle
          title={title}
          onClose={onClose}
          className={titleClassName}
          textClassName={titleTextClassName}
        />
        {children}
      </Container>
    </div>
  );
}
