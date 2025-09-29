import { useCallback, useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import {
  selectCategories,
  setCategories,
} from "~/src/app/store/reducers/categories.slice";

import { promiseWrapper } from "~/src/shared/lib/functions/shared.func";

export const useCategories = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector(selectCategories);
  const [loading, setLoading] = useState<boolean>(false);

  const handleGetCategories = useCallback(async () => {
    await promiseWrapper({
      setLoading,
      callback: async () => {
        dispatch(setCategories([]));
      },
    });
  }, [dispatch]);

  useEffect(() => {
    if (categories.length > 0) return;
    handleGetCategories();
  }, [categories.length, handleGetCategories]);

  return {
    loading,
    categories,
    handleGetCategories,
  };
};
