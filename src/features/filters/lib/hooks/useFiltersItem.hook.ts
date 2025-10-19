import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useUpdateSearchParams } from "~/src/shared/lib/hooks/useUpdateSearchParams.hook";

interface Props {
  filterName: string;
  filterValue?: string;
}

export const useFiltersItem = ({ filterName, filterValue }: Props) => {
  const searchParams = useSearchParams();
  const updateSearchParams = useUpdateSearchParams();
  const [isActiveFilter, setIsActiveFilter] = useState<boolean>(false);

  useEffect(() => {
    if (!filterValue) return;
    const filterByName = searchParams.get(filterName);
    if (filterByName) {
      const items = new Set(filterByName.split(","));
      if (items.has(filterValue)) {
        setIsActiveFilter(true);
      } else {
        setIsActiveFilter(false);
      }
    } else {
      setIsActiveFilter(false);
    }
  }, [searchParams, filterName, filterValue]);

  const handleUpdateParams = useCallback(
    (appendValue: string) => {
      updateSearchParams({
        key: filterName,
        value: appendValue,
        replace: true,
        action: "toggle",
      });
    },
    [updateSearchParams, filterName],
  );

  return {
    isActiveFilter,
    handleUpdateParams,
  };
};
