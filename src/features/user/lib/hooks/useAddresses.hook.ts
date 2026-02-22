import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import { useCreateNotification } from "~/src/widgets/notifications/lib/hooks";
import { useAddressActions } from ".";

import { selectUser, setUser } from "~/src/app/store/reducers/user.slice";
import { promiseWrapper } from "~/src/shared/lib/functions/shared.func";
import { getUserAddresses } from "~/src/features/user/lib/api";

import { addressesMessages, IUserAddress } from "~/src/features/user/model";

/**
 * A hook that returns functions to get, add, delete, and set default addresses, as well as the current addresses and a boolean indicating whether the addresses are loading.
 * @param needLoad - If true, the hook will load the addresses on mount. Defaults to false.
 * @returns {
 *   addresses: Array of IUserAddress
 *   defAddress: IUserAddress | null - The default address
 *   loading: boolean - Whether the addresses are loading
 *   getAddresses: () => Promise<void> - A function to get all addresses
 *   setAddresses: (addresses: IUserAddress[]) => void - A function to set all addresses
 *   handleAddNewAddress: (address: IUserAddressBase) => Promise<void> - A function to add a new address
 *   handleDeleteAddress: (id: number) => Promise<void> - A function to delete an address
 *   handleSetDefaultAddress: (id: number) => Promise<void> - A function to set an address as default
 * }
 **/
export const useAddresses = (needLoad?: boolean) => {
  const dispatch = useAppDispatch();
  const { addresses } = useAppSelector(selectUser);
  const [loading, setLoading] = useState<boolean>(false);
  const [defAddress, setDefAddress] = useState<IUserAddress | null>(
    addresses[0] || null,
  );
  const createNotification = useCreateNotification();

  const setAddresses = useCallback(
    (addresses: IUserAddress[]) => {
      dispatch(
        setUser({
          addresses,
        }),
      );
    },
    [dispatch],
  );

  const promiseCallback = useCallback(
    async (
      callback: () => Promise<void>,
      fallback?: (msg?: string) => void,
    ) => {
      await promiseWrapper({
        setLoading,
        needLoad,
        callback,
        fallback,
      });
    },
    [needLoad],
  );

  const getAddresses = useCallback(async () => {
    await promiseCallback(
      async () => {
        const res = await getUserAddresses();
        setAddresses(res || []);
      },
      (msg) => createNotification(msg || addressesMessages.cantGet, "error"),
    );
  }, [promiseCallback, setAddresses, createNotification]);

  const { addNewAddress, deleteAddress, setDefaultAddress } = useAddressActions(
    {
      promiseCallback,
      getAddresses,
    },
  );

  useEffect(() => {
    if (addresses && addresses.length > 0) {
      let defaultAddress = addresses[0] || null;

      const newDefault = addresses.find((item) => item.is_default);
      if (newDefault) defaultAddress = newDefault;

      setDefAddress(defaultAddress);
    }
  }, [addresses]);

  return {
    addresses,
    defAddress,
    loading,
    getAddresses,
    setAddresses,
    handleAddNewAddress: addNewAddress,
    handleDeleteAddress: deleteAddress,
    handleSetDefaultAddress: setDefaultAddress,
  };
};
