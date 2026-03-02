import { useCallback, useState } from "react";
import { useUserPersonal } from "~/src/features/user/lib/hooks";
import { useCreateNotification } from "~/src/widgets/notifications/lib/hooks";
import { useAddresses } from "~/src/features/user/lib/hooks";
import { useFormatSuggestion } from ".";

import {
  AddressesModalStage,
  newAddressSkeleton,
} from "~/src/entities/addresses-modal/model";
import {
  IAddressSuggestionResponse,
  IUserAddressBase,
} from "~/src/features/user/model";
import { AxiosError } from "axios";

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
  const formatSuggestion = useFormatSuggestion();

  const [stage, setStage] = useState<AddressesModalStage>("default");
  const [newAddress, setNewAddress] =
    useState<IUserAddressBase>(newAddressSkeleton);

  const onSuggestionClick = useCallback(
    (sgn: IAddressSuggestionResponse) => {
      if (!hasPersonalData) {
        createNotification("Заполните персональные данные в профиле", "error");
        return;
      }

      setNewAddress(formatSuggestion(sgn));
    },
    [hasPersonalData, createNotification, formatSuggestion],
  );

  const onAddressClick = useCallback(
    async (type: "delete" | "default", id: string) => {
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
      await handleAddNewAddress(newAddress);
      setStage("default");
      setNewAddress(newAddressSkeleton);
    } catch (err: AxiosError<{ message?: string }> | any) {
      console.error(err);
    }
  }, [handleAddNewAddress, newAddress]);

  return {
    addresses,
    loading,
    stage,
    setStage,
    onSaveButtonClick,
    onAddressClick,
    onSuggestionClick,
  };
};
