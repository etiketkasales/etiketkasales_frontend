import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import { IFilters } from "../../model";
import { useFiltersParse } from "./useFiltersParse.hook";
import { getProductsFilters } from "../api";
import {
  selectCatalogue,
  setCatalogue,
} from "~/src/app/store/reducers/catalogue.slice";

export const useFiltersInit = (options?: { enabled?: boolean }) => {
  const enabled = options?.enabled ?? true;
  const dispatch = useAppDispatch();
  const { parsedFilters } = useAppSelector(selectCatalogue);
  const parseFilters = useFiltersParse();

  const setParsedFilters = useCallback(
    (filters: IFilters) => {
      if (!filters) return;
      const parsedFilters = parseFilters(filters);
      if (parsedFilters) {
        dispatch(
          setCatalogue({
            parsedFilters,
          }),
        );
      }
    },
    [dispatch, parseFilters],
  );

  const getFilters = useCallback(async () => {
    try {
      const res = await getProductsFilters();
      if (res) {
        setParsedFilters(res);
      }
    } catch (err) {
      console.error(err);
    }
  }, [setParsedFilters]);

  useEffect(() => {
    if (!enabled || parsedFilters.length > 0) return;
    void getFilters();
  }, [getFilters, enabled, parsedFilters.length]);

  return {
    getFilters,
  };
};
