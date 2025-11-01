import { useCallback, useEffect, useState } from "react";
import { promiseWrapper } from "~/src/shared/lib/functions/shared.func";
import { getCatalogueSortOptions } from "~/src/entities/catalogue-section/lib/api/sort.api";

import { ISortOption } from "~/src/entities/catalogue-section/model";

export const useGetSortOptions = () => {
  const [sortOptions, setSortOptions] = useState<ISortOption[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getSortOptions = useCallback(async () => {
    await promiseWrapper({
      setLoading,
      callback: async () => {
        const options = await getCatalogueSortOptions();
        setSortOptions(options.data || []);
      },
    });
  }, []);

  useEffect(() => {
    getSortOptions();
  }, [getSortOptions]);

  return {
    sortOptions,
    loading: loading,
  };
};
