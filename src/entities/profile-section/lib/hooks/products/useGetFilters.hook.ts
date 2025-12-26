import { useCallback, useState } from "react";
import { promiseWrapper } from "~/src/shared/lib/functions/shared.func";
import { getNewProductFilters } from "~/src/entities/profile-section/lib/api";

import {
  INewProduct,
  INewProductFilter,
  INewProductInput,
} from "~/src/entities/profile-section/model";
import { MessageI } from "~/src/shared/model";

interface Props {
  setRequiredFields: (requiredFields: (keyof INewProduct)[]) => void;
}

/**
 * useGetFilters - a hook for fetching new product filters
 *
 * @param {Props} - an object containing a setRequiredFields function
 * @returns {object} - an object containing filtersToMap, loading, error, and getFilters
 * @property {INewProductInput[]} filtersToMap - an array of filters to be used in the form
 * @property {boolean} loading - a boolean indicating whether the filters are being fetched
 * @property {MessageI | null} error - an error message if something went wrong
 * @property {function} getFilters - a function for fetching the filters
 */
export const useGetFilters = ({ setRequiredFields }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<MessageI | null>(null);
  const [filtersToMap, setFiltersToMap] = useState<INewProductInput[]>([]);

  const parseFilters = useCallback(
    (filters: INewProductFilter[]): INewProductInput[] => {
      if (!filters) return [];
      const newFilters = filters.map((filter): INewProductInput => {
        let type: "select" | "numeric" = "select";
        if (Array.isArray(filter.options) && filter.for_empty_value) {
          type = "select";
        } else {
          type = "numeric";
        }

        return {
          type,
          ...filter,
        };
      });
      return newFilters;
    },
    [],
  );

  const getFilters = useCallback(async () => {
    await promiseWrapper({
      setLoading,
      setError,
      callback: async () => {
        const res = await getNewProductFilters();
        if (res && Array.isArray(res)) {
          setFiltersToMap(parseFilters(res) || []);
          setRequiredFields(parseFilters(res).map((item) => item.field) || []);
        }
      },
    });
  }, [parseFilters, setRequiredFields]);

  return {
    filtersToMap,
    loading,
    error,
    getFilters,
  };
};
