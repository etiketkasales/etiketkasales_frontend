import { useCallback, useEffect, useState } from "react";
import { promiseWrapper } from "~/src/shared/lib/functions/shared.func";
import { getNewProductFilters } from "~/src/entities/profile-section/lib/api";

import {
  INewProductFilter,
  INewProductInput,
} from "~/src/entities/profile-section/model";
import { MessageI } from "~/src/shared/model";

export const useGetFilters = () => {
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
        }
      },
    });
  }, [parseFilters]);

  useEffect(() => {
    getFilters();
  }, [getFilters]);

  return {
    filtersToMap,
    loading,
    error,
  };
};
