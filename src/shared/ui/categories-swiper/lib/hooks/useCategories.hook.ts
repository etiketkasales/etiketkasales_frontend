import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import {
  selectCategories,
  setCategories,
} from "~/src/app/store/reducers/categories.slice";

import { promiseWrapper } from "~/src/shared/lib/functions/shared.func";
import { getCategoriesList } from "../api/categories.api";

export const useCategories = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector(selectCategories);
  const [loading, setLoading] = useState<boolean>(false);

  const handleGetCategories = async () => {
    await promiseWrapper({
      setLoading,
      callback: async () => {
        const response = await getCategoriesList();
        if (!response) return;
        dispatch(setCategories(response.data ?? []));
      },
    });
  };

  useEffect(() => {
    if (categories.length > 0) return;
    handleGetCategories();
  }, [categories.length]);

  return {
    loading,
    categories,
    handleGetCategories,
  };
};
