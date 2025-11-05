import { useCallback, useState } from "react";

import { AddressesModalStage } from "~/src/entities/addresses-modal/model";

export const useAddressesModal = () => {
  const [stage, setStage] = useState<AddressesModalStage>("default");
  const [newAddress, setNewAddress] = useState<string>("");

  const onInputChange = useCallback((v: string) => {
    setNewAddress(v);
  }, []);

  return {
    onInputChange,
    newAddress,
    stage,
    setStage,
  };
};
