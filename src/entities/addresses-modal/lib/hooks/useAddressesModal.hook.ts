import { useCallback, useState } from "react";
import { useUserPersonal } from "~/src/features/user/lib/hooks";
import { useAddresses } from "~/src/features/user/lib/hooks";
import { addNotification } from "~/src/app/store/reducers/notifications.slice";
import { useAddressSuggestions } from ".";
import { useAppDispatch } from "~/src/app/store/hooks";

import {
  AddressesModalStage,
  INewAddress,
  newAddressSkeleton,
} from "~/src/entities/addresses-modal/model";
import { ISuggestedAddress } from "~/src/features/user/model";
import { AxiosError } from "axios";

export const useAddressesModal = (onModalClose: () => void) => {
  const dispatch = useAppDispatch();
  const {
    addresses,
    loading,
    handleAddNewAddress,
    handleDeleteAddress,
    handleSetDefaultAddress,
  } = useAddresses();
  const hasPersonalData = useUserPersonal();
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
    [getSuggestions],
  );

  const onSuggestionClick = useCallback(
    (sgn: ISuggestedAddress) => {
      if (!hasPersonalData) {
        dispatch(
          addNotification({
            message: "Заполните персональные данные в профиле",
            type: "error",
            field: "global",
          }),
        );
        return;
      }
      const hasSameAddress = addresses.some((a) => a.id === sgn.id);
      if (hasSameAddress) {
        dispatch(
          addNotification({
            message: "Такой адрес уже добавлен",
            type: "error",
            field: "global",
          }),
        );
        return;
      }

      setNewAddress({
        forApi: formatSuggestion(sgn),
        forDisplay: sgn.full_address,
      });
    },
    [formatSuggestion, hasPersonalData, addresses, dispatch],
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
