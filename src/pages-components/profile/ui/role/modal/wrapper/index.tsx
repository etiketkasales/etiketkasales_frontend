import React from "react";

import classes from "./profile-modal-wrapper.module.scss";
import Modal from "~/src/shared/ui/modals/ui/default";

interface Props {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
}

export default function ProfileModalWrapper({
  title,
  children,
  onClose,
  isOpen,
}: Props) {
  return (
    <Modal
      title={title}
      onClose={onClose}
      isOpen={isOpen}
      containerClassName={classes.container}
    >
      {children}
    </Modal>
  );
}
