import { useCallback } from "react";
import { useCreateNotification } from "~/src/widgets/notifications/lib/hooks";
import {
  addNewAddress,
  deleteAddress,
  setDefaultAddress,
} from "~/src/features/user/lib/api";

import { addressesMessages, IUserAddressBase } from "~/src/features/user/model";

interface Props {
  promiseCallback: (
    callback: () => Promise<void>,
    fallback?: (errMsg?: string) => void,
  ) => Promise<void>;
  getAddresses: () => Promise<void>;
}

export const useAddressActions = ({ promiseCallback, getAddresses }: Props) => {
  const createNotification = useCreateNotification();

  const handleDeleteAddress = useCallback(
    async (id: string) => {
      await promiseCallback(
        async () => {
          await deleteAddress(id);
          await getAddresses();
          createNotification(addressesMessages.deleted, "success");
        },
        (msg) =>
          createNotification(msg || addressesMessages.cantDelete, "error"),
      );
    },
    [getAddresses, promiseCallback, createNotification],
  );

  const handleAddNewAddress = useCallback(
    async (address: IUserAddressBase) => {
      await promiseCallback(
        async () => {
          await addNewAddress(address);
          await getAddresses();
          createNotification(addressesMessages.added, "success");
          createNotification(addressesMessages.settedDefault, "warning");
        },
        (msg) => createNotification(msg || addressesMessages.cantAdd, "error"),
      );
    },
    [getAddresses, promiseCallback, createNotification],
  );

  const handleSetDefaultAddress = useCallback(
    async (id: string) => {
      await promiseCallback(
        async () => {
          await setDefaultAddress(id);
          await getAddresses();
          createNotification(addressesMessages.settedDefault, "success");
        },
        (msg) => createNotification(msg || addressesMessages.cantSet, "error"),
      );
    },
    [promiseCallback, getAddresses, createNotification],
  );

  return {
    addNewAddress: handleAddNewAddress,
    setDefaultAddress: handleSetDefaultAddress,
    deleteAddress: handleDeleteAddress,
  };
};
