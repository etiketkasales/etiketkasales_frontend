import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useUpdateSearchParams } from "~/src/shared/lib/hooks/useUpdateSearchParams.hook";

import { IFiltersItemHookProps } from "~/src/features/filters/model";

interface Props extends IFiltersItemHookProps {
  filtersArray: string[];
}

export const useFiltersCheckbox = ({ filterName, filtersArray }: Props) => {
  const searchParams = useSearchParams();
  const handleUpdateSearchParams = useUpdateSearchParams();
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isAllActive, setIsAllActive] = useState<boolean>(false);

  const updateParams = useCallback(
    (action: "set" | "remove" | "add" | "clear", v?: string | string[]) => {
      handleUpdateSearchParams({
        key: filterName,
        value: v,
        action,
        routerReplace: true,
      });
    },
    [filterName, handleUpdateSearchParams],
  );

  const clearAllFilters = useCallback(() => {
    updateParams("clear");
  }, [updateParams]);

  const addCertainFilter = useCallback(
    (v: string) => {
      const newFilters = [...activeFilters, v];
      setActiveFilters(newFilters);
      if (newFilters.length === filtersArray.length) {
        updateParams("clear");
        return;
      }
      updateParams("add", v);
    },
    [updateParams, activeFilters, filtersArray.length],
  );

  const removeCertainFilter = useCallback(
    (v: string) => {
      const newFilters = activeFilters.filter((item) => item !== v);
      if (!newFilters.length) {
        setActiveFilters(filtersArray);
        updateParams("clear");
        return;
      }
      setActiveFilters(newFilters);
      updateParams("set", newFilters);
    },
    [updateParams, activeFilters, filtersArray],
  );

  const addAllExceptOne = useCallback(
    (exceptValue: string) => {
      const newArray = filtersArray.filter((item) => item !== exceptValue);
      setActiveFilters(newArray);
      updateParams("set", newArray);
    },
    [updateParams, filtersArray],
  );

  useEffect(() => {
    if (activeFilters?.length === filtersArray?.length) {
      setIsAllActive(true);
    } else if (
      activeFilters.length < filtersArray.length &&
      activeFilters.length > 0
    ) {
      setIsAllActive(false);
    }
  }, [activeFilters, filtersArray]);

  useEffect(() => {
    setActiveFilters(filtersArray);
    const filterByName = searchParams.get(filterName);
    const searchFilters = filterByName?.split(",") || filtersArray;
    setActiveFilters(searchFilters);
  }, [filterName, searchParams, filtersArray]);

  return {
    activeFilters,
    isAllActive,
    clearAllFilters,
    addCertainFilter,
    addAllExceptOne,
    removeCertainFilter,
  };
};
