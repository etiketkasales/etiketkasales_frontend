"use client";
import classNames from "classnames";
import { useAddressesModal } from "../lib/hooks";

import classes from "./addresses-modal.module.scss";
import Modal from "~/src/shared/ui/modals/ui/default";
import AddressesModalDefault from "./default";
import AddressesModalAdd from "./add";
import Loader from "~/src/shared/ui/loader";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  action: "choose_address" | "see_addresses";
}

export default function AddressesModal({
  isOpen,
  onClose,
  action = "see_addresses",
}: Props) {
  const {
    stage,
    setStage,
    loading,
    addresses,
    onSaveButtonClick,
    onAddressClick,
    onSuggestionClick,
  } = useAddressesModal(onClose);

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
        `${classes[stage]} ${classes.container} flex-column gap-6 relative`,
      )}
      titleTextClassName={classes.title}
    >
      {loading && <Loader radius={20} />}
      <div className={classNames(`flex-row relative`, classes.content)}>
        <AddressesModalDefault
          stage={stage}
          setStage={(s) => setStage(s)}
          addresses={addresses}
          onAddressClick={onAddressClick}
          addressClickType={action === "choose_address" ? "default" : "delete"}
        />
        <AddressesModalAdd
          stage={stage}
          onButtonClick={onSaveButtonClick}
          onSgnClick={onSuggestionClick}
        />
      </div>
    </Modal>
  );
}
