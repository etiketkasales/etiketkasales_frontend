import { useCallback, useState } from "react";
import { useAddresses } from "~/src/features/user/lib/hooks/useAddresses.hook";

import {
  AddressesModalStage,
  INewAddress,
  newAddressSkeleton,
} from "~/src/entities/addresses-modal/model";
import { useAddressSuggestions } from "./useAddressSuggestions.hook";
import { ISuggestedAddress } from "~/src/features/user/model";

export const useAddressesModal = (onModalClose: () => void) => {
  const {
    addresses,
    loading,
    handleAddNewAddress,
    handleDeleteAddress,
    handleSetDefaultAddress,
  } = useAddresses();
  const {
    loading: suggestionsLoading,
    suggestions,
    getSuggestions,
    formatSuggestion,
  } = useAddressSuggestions();
  const [stage, setStage] = useState<AddressesModalStage>("default");
  const [sgnsOpen, setSgnsOpen] = useState<boolean>(false); // для показа/скрытия списка подсказок
  const [newAddress, setNewAddress] = useState<INewAddress>({
    forApi: newAddressSkeleton,
    forDisplay: "",
  });

  const onInputChange = useCallback(
    async (v: string) => {
      setNewAddress((prev) => ({
        ...prev,
        forDisplay: v,
      }));
      setSgnsOpen(true);
      await getSuggestions(v);
    },
    [getSuggestions]
  );

  const onSuggestionClick = useCallback(
    (sgn: ISuggestedAddress) => {
      setNewAddress({
        forApi: formatSuggestion(sgn),
        forDisplay: sgn.full_address,
      });
    },
    [formatSuggestion]
  );

  const onAddressClick = useCallback(
    async (type: "delete" | "default", id: number) => {
      if (type === "delete") {
        await handleDeleteAddress(id);
      } else if (type === "default") {
        await handleSetDefaultAddress(id);
        onModalClose();
      }
    },
    [handleDeleteAddress, handleSetDefaultAddress, onModalClose]
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
    onSuggestionClick,
    suggestions,
    suggestionsLoading,
    sgnsOpen,
    setSgnsOpen,
  };
};
