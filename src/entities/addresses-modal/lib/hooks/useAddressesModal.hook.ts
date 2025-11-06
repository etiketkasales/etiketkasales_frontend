import { useCallback, useState } from "react";
import { useAddresses } from "~/src/features/user/lib/hooks/useAddresses.hook";

import {
  AddressesModalStage,
  INewAddress,
  newAddressSkeleton,
} from "~/src/entities/addresses-modal/model";

export const useAddressesModal = (onModalClose: () => void) => {
  const {
    addresses,
    loading,
    handleAddNewAddress,
    handleDeleteAddress,
    handleSetDefaultAddress,
  } = useAddresses();
  const [stage, setStage] = useState<AddressesModalStage>("default");
  const [newAddress, setNewAddress] = useState<INewAddress>({
    forApi: newAddressSkeleton,
    forDisplay: "",
  });

  const onInputChange = useCallback((v: string) => {
    setNewAddress((prev) => ({
      ...prev,
      forDisplay: v,
    }));
  }, []);

  const onAddressClick = useCallback(
    async (type: "delete" | "default", id: number) => {
      if (type === "delete") {
        await handleDeleteAddress(id);
      } else if (type === "default") {
        await handleSetDefaultAddress(id);
        onModalClose();
      }
    },
    [handleDeleteAddress, handleSetDefaultAddress, onModalClose],
  );

  const onSaveButtonClick = useCallback(async () => {
    await handleAddNewAddress(newAddress.forApi);
    setStage("default");
    setNewAddress({
      forApi: newAddressSkeleton,
      forDisplay: "",
    });
  }, [handleAddNewAddress, newAddress.forApi]);

  return {
    addresses,
    loading,
    onInputChange,
    newAddress: newAddress.forDisplay,
    stage,
    setStage,
    onSaveButtonClick,
    onAddressClick,
  };
};
