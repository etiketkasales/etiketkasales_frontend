import { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import { selectUser, setUser } from "~/src/app/store/reducers/user.slice";
import {
  addNewCompany,
  deleteCompany,
  getCompanies,
} from "~/src/entities/profile-section/lib/api";
import { promiseWrapper } from "~/src/shared/lib/functions/shared.func";

import { IUserCompany, IUserCompanyBase } from "~/src/features/user/model";

/**
 * @returns { addCompany, handleDeleteCompany, handleGetCompanies, companies, loading }
 * A hook that returns functions to add, delete, and get companies, as well as the current companies and a boolean indicating whether the companies are loading.
 */
export const useUserCompanies = () => {
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
      setCompanies(res.filter((item) => item.is_active) || []);
    });
  }, [setCompanies, promiseCallback]);

  const addCompany = useCallback(
    async (data: IUserCompanyBase, closeModal?: () => void) => {
      await promiseCallback(async () => {
        const mainRes = await addNewCompany(data);
        if (mainRes.success) {
          const res = await getCompanies();
          if (Array.isArray(res)) {
            setCompanies(res);
          }
          closeModal?.();
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

  return {
    addCompany,
    handleDeleteCompany,
    handleGetCompanies,
    companies,
    loading,
  };
};
