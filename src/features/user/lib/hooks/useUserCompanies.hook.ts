import { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import { useCreateNotification } from "~/src/widgets/notifications/lib/hooks";
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
  const createNotification = useCreateNotification();

  const setCompanies = useCallback(
    (data: IUserCompany[]) => {
      dispatch(setUser({ companies: data.filter((item) => item.is_active) }));
    },
    [dispatch],
  );

  const promiseCallback = useCallback(
    async (callback: () => Promise<void>, fallback?: () => void) => {
      await promiseWrapper({
        setLoading,
        callback,
        fallback,
      });
    },
    [],
  );

  const handleGetCompanies = useCallback(async () => {
    await promiseCallback(
      async () => {
        const res = await getCompanies();
        setCompanies(res.filter((item) => item.is_active) || []);
      },
      () =>
        createNotification("Не удалось получить список организаций", "error"),
    );
  }, [setCompanies, promiseCallback, createNotification]);

  const addCompany = useCallback(
    async (data: IUserCompanyBase, closeModal?: () => void) => {
      await promiseCallback(
        async () => {
          const mainRes = await addNewCompany(data);
          if (mainRes.success) {
            const res = await getCompanies();
            if (Array.isArray(res)) {
              setCompanies(res);
              createNotification("Организация добавлена", "success");
            }
            closeModal?.();
          }
        },
        () => createNotification("Не удалось добавить организацию", "error"),
      );
    },
    [promiseCallback, setCompanies, createNotification],
  );

  const handleDeleteCompany = useCallback(
    async (id: number) => {
      await promiseCallback(
        async () => {
          await deleteCompany(id);
          await handleGetCompanies();
          createNotification("Организация удалена", "success");
        },
        () => createNotification("Не удалось удалить организацию", "error"),
      );
    },
    [promiseCallback, handleGetCompanies, createNotification],
  );

  return {
    addCompany,
    handleDeleteCompany,
    handleGetCompanies,
    companies,
    loading,
  };
};
