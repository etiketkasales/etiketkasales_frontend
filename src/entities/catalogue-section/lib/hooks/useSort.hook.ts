import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useUpdateSearchParams } from "~/src/shared/lib/hooks/useUpdateSearchParams.hook";
import { useDecodeSortParam } from "./useDecodeSortParam.hook";

import { ISortOption } from "../../model";

interface Props {
  sortOptions: ISortOption[];
}

export const useSort = ({ sortOptions }: Props) => {
  const searchParams = useSearchParams();
  const updateParams = useUpdateSearchParams();
  const sortOptionFallback = useMemo(() => {
    const firstOption = sortOptions?.[0];
    return firstOption?.orders?.[0]?.name || "";
  }, [sortOptions]);

  const decodeSortParam = useDecodeSortParam();

  const [activeSortOption, setActiveSortOption] = useState(sortOptionFallback);

  useEffect(() => {
    const sort = searchParams.get("sort");
    const { sortBy, sortOrder } = decodeSortParam(sort || "");
    if (sortBy && sortOrder) {
      const newOption = sortOptions.find((option) => option.key === sortBy);
      const optionSortOrder = newOption?.orders.find(
        (order) => order.key === sortOrder,
      );

      setActiveSortOption(optionSortOrder?.name || sortOptionFallback);
    } else {
      setActiveSortOption(sortOptionFallback);
    }
  }, [searchParams, sortOptions, sortOptionFallback, decodeSortParam]);

  const onItemClick = useCallback(
    (sortBy: string, sortOrder: string) => {
      updateParams({
        key: "sort",
        value: `sort_by=${sortBy}, sort_order=${sortOrder}`,
        action: "set",
        routerReplace: true,
      });
    },
    [updateParams],
  );

  return {
    activeSortOption,
    setActiveSortOption,
    onItemClick,
  };
};
