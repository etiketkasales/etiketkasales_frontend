"use client";
import React from "react";
import classNames from "classnames";
import { useAddressesModal } from "../lib/hooks";

import classes from "./addresses-modal.module.scss";
import Modal from "~/src/shared/ui/modals/ui/default";
import AddressesModalDefault from "./default";
import AddressesModalAdd from "./add";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddressesModal({ isOpen, onClose }: Props) {
  const { stage, setStage, newAddress, onInputChange } = useAddressesModal();

  return (
    <Modal
      title={stage === "default" ? "Адреса" : "Новый адрес\nдоставки"}
      isOpen={isOpen}
      onClose={() => {
        if (stage === "default") {
          onClose();
        } else {
          setStage("default");
        }
      }}
      containerClassName={classNames(
        `${classes[stage]} ${classes.container} flex-column gap-6`,
      )}
      titleTextClassName={classes.title}
    >
      <div className={`flex-row relative ${classes.content}`}>
        <AddressesModalDefault stage={stage} setStage={(s) => setStage(s)} />
        <AddressesModalAdd
          stage={stage}
          newAddress={newAddress}
          onInputChange={onInputChange}
          onButtonClick={() => setStage("default")}
        />
      </div>
    </Modal>
  );
}
