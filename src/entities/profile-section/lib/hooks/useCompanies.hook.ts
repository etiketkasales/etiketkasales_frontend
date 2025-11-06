import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import { selectUser, setUser } from "~/src/app/store/reducers/user.slice";
import {
  addNewCompany,
  deleteCompany,
  getCompanies,
} from "~/src/entities/profile-section/lib/api";
import { promiseWrapper } from "~/src/shared/lib/functions/shared.func";

import {
  IUserCompany,
  IUserCompanyBase,
} from "~/src/entities/profile-section/model";

export const useCompanies = () => {
  const dispatch = useAppDispatch();
  const { companies } = useAppSelector(selectUser);
  const [loading, setLoading] = useState<boolean>(false);

  const setCompanies = useCallback(
    (data: IUserCompany[]) => {
      dispatch(setUser({ companies: data.filter((item) => item.is_active) }));
    },
    [dispatch],
  );

  const promiseCallback = useCallback(async (callback: () => Promise<void>) => {
    await promiseWrapper({
      setLoading,
      callback,
    });
  }, []);

  const handleGetCompanies = useCallback(async () => {
    await promiseCallback(async () => {
      const res = await getCompanies();
      setCompanies(res || []);
    });
  }, [setCompanies, promiseCallback]);

  const addCompany = useCallback(
    async (data: IUserCompanyBase) => {
      await promiseCallback(async () => {
        const res = await addNewCompany(data);
        if (Array.isArray(res)) {
          setCompanies(res);
        }
      });
    },
    [promiseCallback, setCompanies],
  );

  const handleDeleteCompany = useCallback(
    async (id: number) => {
      await promiseCallback(async () => {
        await deleteCompany(id);
        await handleGetCompanies();
      });
    },
    [promiseCallback, handleGetCompanies],
  );

  useEffect(() => {
    handleGetCompanies();
  }, [handleGetCompanies]);

  return {
    addCompany,
    handleDeleteCompany,
    companies,
    loading,
  };
};
