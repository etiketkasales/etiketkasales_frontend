import { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import { useCreateNotification } from "~/src/widgets/notifications/lib/hooks";

import { selectUser, setUser } from "~/src/app/store/reducers/user.slice";
import { promiseWrapper } from "~/src/shared/lib/functions/shared.func";
import {
  addNewAddress,
  deleteAddress,
  getUserAddresses,
  setDefaultAddress,
} from "~/src/features/user/lib/api";

import {
  addressesMessages,
  IUserAddress,
  IUserAddressBase,
} from "~/src/features/user/model";
import { AxiosError } from "axios";

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
  const hasBeenLoaded = useRef<boolean>(false);
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
    async (callback: () => Promise<void>) => {
      try {
        await promiseWrapper({
          setLoading,
          needLoad,
          callback,
        });
      } catch (err: AxiosError<{ message?: string }> | any) {
        createNotification(err.message || "Произошла ошибка", "error");
        throw err;
      }
    },
    [needLoad, createNotification],
  );

  const getAddresses = useCallback(async () => {
    await promiseCallback(async () => {
      hasBeenLoaded.current = true;
      const res = await getUserAddresses();
      setAddresses(res || []);
    });
  }, [promiseCallback, setAddresses]);

  const handleDeleteAddress = useCallback(
    async (id: string) => {
      await promiseCallback(async () => {
        await deleteAddress(id);
        await getAddresses();
        createNotification(addressesMessages.deleted, "success");
      });
    },
    [getAddresses, promiseCallback, createNotification],
  );

  const handleAddNewAddress = useCallback(
    async (address: IUserAddressBase) => {
      await promiseCallback(async () => {
        await addNewAddress(address);
        await getAddresses();
        createNotification(addressesMessages.added, "success");
        createNotification(addressesMessages.settedDefault, "warning");
      });
    },
    [getAddresses, promiseCallback, createNotification],
  );

  const handleSetDefaultAddress = useCallback(
    async (id: string) => {
      await promiseCallback(async () => {
        await setDefaultAddress(id);
        await getAddresses();
        createNotification(addressesMessages.settedDefault, "success");
      });
    },
    [getAddresses, promiseCallback, createNotification],
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
    handleAddNewAddress,
    handleDeleteAddress,
    handleSetDefaultAddress,
  };
};
