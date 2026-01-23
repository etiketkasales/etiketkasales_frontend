import { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectNavigation } from "~/src/app/store/reducers/navigation.slice";
import { promiseWrapper } from "~/src/shared/lib/functions/shared.func";
import { getCategories } from "../api/categories.api";

import { ICategory } from "~/src/features/categories/model";

export const useCategoriesSwiper = () => {
  const { loaded } = useAppSelector(selectNavigation);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleGetCategories = useCallback(async () => {
    await promiseWrapper({
      setLoading,
      setErrBool: setError,
      callback: async () => {
        const res = await getCategories();
        setCategories(res);
      },
    });
  }, []);

  useEffect(() => {
    handleGetCategories();
  }, [handleGetCategories]);

  return {
    categories,
    loading: !loaded || loading,
    error,
  };
};
