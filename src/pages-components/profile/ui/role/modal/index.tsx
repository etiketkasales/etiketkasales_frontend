import React from "react";

import AddressesModal from "~/src/entities/addresses-modal/ui";
import LogoutModal from "~/src/entities/profile-section/ui/modals/logout";
import DeleteCompanyModal from "~/src/entities/profile-section/ui/modals/delete";
import { ProfileActionType } from "~/src/entities/profile-section/model";

interface Props {
  modalType: ProfileActionType;
  onClose: () => void;
}

export default function ProfileModal({ modalType, onClose }: Props) {
  switch (modalType) {
    default:
      return null;
    case "addresses":
      return (
        <AddressesModal
          isOpen={modalType === "addresses"}
          onClose={onClose}
          action="see_addresses"
        />
      );
    case "logout":
      return <LogoutModal isOpen={modalType === "logout"} onClose={onClose} />;
    case "delete":
      return (
        <DeleteCompanyModal isOpen={modalType === "delete"} onClose={onClose} />
      );
  }
}
