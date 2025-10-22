import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useUpdateSearchParams } from "~/src/shared/lib/hooks/useUpdateSearchParams.hook";

import { IFiltersItemHookProps } from "~/src/features/filters/model";
import { IInitializedFilter } from "../../ui";

interface Props extends IFiltersItemHookProps {
  filtersArray: string[];
  filterTitle: string;
  setFilterForCatalogue: React.Dispatch<
    React.SetStateAction<IInitializedFilter[]>
  >;
}

export const useFiltersCheckbox = ({
  filterName,
  filtersArray,
  filterTitle,
  setFilterForCatalogue,
}: Props) => {
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

  // обновление фильтров для использования в CatalogueFilters
  const updateGlobalFilter = useCallback(
    (filters: string[]) => {
      setFilterForCatalogue((prev) => {
        const withoutCurrent = prev.filter(
          (item) => item.filterName !== filterName,
        );
        return [...withoutCurrent, { title: filterTitle, filterName, filters }];
      });
    },
    [filterName, filterTitle, setFilterForCatalogue],
  );

  // логика обновления фильтров
  const clearAllFilters = useCallback(() => {
    updateParams("clear");
    updateGlobalFilter([]);
  }, [updateParams, updateGlobalFilter]);

  const addCertainFilter = useCallback(
    (v: string) => {
      const newFilters = [...activeFilters, v];
      setActiveFilters(newFilters);
      updateGlobalFilter(newFilters);
      if (newFilters.length === filtersArray.length) {
        clearAllFilters();
        return;
      }
      updateParams("add", v);
    },
    [
      updateParams,
      activeFilters,
      filtersArray.length,
      clearAllFilters,
      updateGlobalFilter,
    ],
  );

  const removeCertainFilter = useCallback(
    (v: string) => {
      const newFilters = activeFilters.filter((item) => item !== v);
      if (!newFilters.length) {
        setActiveFilters(filtersArray);
        clearAllFilters();
        return;
      }
      setActiveFilters(newFilters);
      updateGlobalFilter(newFilters);
      updateParams("set", newFilters);
    },
    [
      updateParams,
      activeFilters,
      filtersArray,
      updateGlobalFilter,
      clearAllFilters,
    ],
  );

  const addAllExceptOne = useCallback(
    (exceptValue: string) => {
      const newArray = filtersArray.filter((item) => item !== exceptValue);
      setActiveFilters(newArray);
      updateGlobalFilter(newArray);
      updateParams("set", newArray);
    },
    [updateParams, filtersArray, updateGlobalFilter],
  );

  // чекбокс когда все фильтры (не)активны
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

  // инициализация фильтров
  useEffect(() => {
    const filterByName = searchParams.get(filterName);
    const searchFilters = filterByName?.split(",");

    setActiveFilters(searchFilters || filtersArray);

    const filtersToSet =
      searchFilters?.length === filtersArray.length ? [] : searchFilters;
    updateGlobalFilter(filtersToSet || []);
  }, [searchParams, filterName, filtersArray, updateGlobalFilter]);

  return {
    activeFilters,
    isAllActive,
    clearAllFilters,
    addCertainFilter,
    addAllExceptOne,
    removeCertainFilter,
  };
};
