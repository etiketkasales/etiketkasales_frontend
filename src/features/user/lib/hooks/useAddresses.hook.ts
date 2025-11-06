import { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import { selectUser, setUser } from "~/src/app/store/reducers/user.slice";
import { promiseWrapper } from "~/src/shared/lib/functions/shared.func";
import {
  addNewAddress,
  deleteAddress,
  getUserAddresses,
  setDefaultAddress,
} from "~/src/features/user/lib/api";

import { IUserAddress, IUserAddressBase } from "~/src/features/user/model";

export const useAddresses = (needLoad?: boolean) => {
  const dispatch = useAppDispatch();
  const { addresses } = useAppSelector(selectUser);
  const [loading, setLoading] = useState<boolean>(false);
  const hasBeenLoaded = useRef<boolean>(false);

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
      await promiseWrapper({
        setLoading,
        needLoad,
        callback,
      });
    },
    [needLoad],
  );

  const getAddresses = useCallback(async () => {
    await promiseCallback(async () => {
      hasBeenLoaded.current = true;
      const res = await getUserAddresses();
      setAddresses(res || []);
    });
  }, [promiseCallback, setAddresses]);

  const handleDeleteAddress = useCallback(
    async (id: number) => {
      await promiseCallback(async () => {
        await deleteAddress(id);
        await getAddresses();
      });
    },
    [getAddresses, promiseCallback],
  );

  const handleAddNewAddress = useCallback(
    async (address: IUserAddressBase) => {
      await promiseCallback(async () => {
        await addNewAddress(address);
        await getAddresses();
      });
    },
    [getAddresses, promiseCallback],
  );

  const handleSetDefaultAddress = useCallback(
    async (id: number) => {
      await promiseCallback(async () => {
        await setDefaultAddress(id);
        await getAddresses();
      });
    },
    [getAddresses, promiseCallback],
  );

  useEffect(() => {
    if (addresses && addresses.length > 0) return;
    if (hasBeenLoaded.current) return;
    getAddresses();
  }, [getAddresses, addresses]);

  return {
    addresses,
    loading,
    getAddresses,
    setAddresses,
    handleAddNewAddress,
    handleDeleteAddress,
    handleSetDefaultAddress,
  };
};
