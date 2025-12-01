import { useCallback, useEffect } from "react";
import { useAppDispatch } from "~/src/app/store/hooks";
import { IFilters } from "../../model";
import { useFiltersParse } from "./useFiltersParse.hook";
import { getProductsFilters } from "../api";
import { setCatalogue } from "~/src/app/store/reducers/catalogue.slice";

export const useFiltersInit = () => {
  const dispatch = useAppDispatch();
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
    getFilters();
  }, [getFilters]);

  return {
    getFilters,
  };
};
