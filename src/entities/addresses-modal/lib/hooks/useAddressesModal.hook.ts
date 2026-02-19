import { useCallback, useState } from "react";
import { useUserPersonal } from "~/src/features/user/lib/hooks";
import { useAddressSuggestions } from ".";
import { useCreateNotification } from "~/src/widgets/notifications/lib/hooks";
import { useAddresses } from "~/src/features/user/lib/hooks";

import {
  AddressesModalStage,
  INewAddress,
  newAddressSkeleton,
} from "~/src/entities/addresses-modal/model";
import { ISuggestedAddress } from "~/src/features/user/model";
import { AxiosError } from "axios";
import { useDebounce } from "react-use";

export const useAddressesModal = (onModalClose: () => void) => {
  const {
    addresses,
    loading,
    handleAddNewAddress,
    handleDeleteAddress,
    handleSetDefaultAddress,
  } = useAddresses();
  const hasPersonalData = useUserPersonal();
  const createNotification = useCreateNotification();
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
    },
    [getSuggestions],
  );

  useDebounce(
    async () => {
      if (newAddress.forDisplay.trim().length >= 3) {
        await getSuggestions(newAddress.forDisplay);
      }
    },
    500,
    [newAddress.forDisplay],
  );

  const onSuggestionClick = useCallback(
    (sgn: ISuggestedAddress) => {
      if (!hasPersonalData) {
        createNotification("Заполните персональные данные в профиле", "error");
        return;
      }
      const hasSameAddress = addresses.some((a) => a.id === sgn.id);
      if (hasSameAddress) {
        createNotification("Такой адрес уже добавлен", "error");
        return;
      }

      setNewAddress({
        forApi: formatSuggestion(sgn),
        forDisplay: sgn.full_address,
      });
    },
    [formatSuggestion, hasPersonalData, addresses, createNotification],
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
    [handleDeleteAddress, handleSetDefaultAddress, onModalClose],
  );

  const onSaveButtonClick = useCallback(async () => {
    try {
      await handleAddNewAddress(newAddress.forApi);
      setStage("default");
      setNewAddress({
        forApi: newAddressSkeleton,
        forDisplay: "",
      });
    } catch (err: AxiosError<{ message?: string }> | any) {
      console.error(err);
    }
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
