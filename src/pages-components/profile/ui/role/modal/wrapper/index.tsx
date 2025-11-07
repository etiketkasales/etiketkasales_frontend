import React from "react";
import classNames from "classnames";

import classes from "./profile-modal-wrapper.module.scss";
import Modal from "~/src/shared/ui/modals/ui/default";

interface Props {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
  className?: string;
  needBackButton?: boolean;
}

export default function ProfileModalWrapper({
  title,
  children,
  onClose,
  isOpen,
  className,
  needBackButton = true,
}: Props) {
  return (
    <Modal
      title={title}
      onClose={onClose}
      isOpen={isOpen}
      containerClassName={classNames(classes.container, className)}
      needBackButton={needBackButton}
    >
      {children}
    </Modal>
  );
}
