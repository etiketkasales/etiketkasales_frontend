import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useDecodeSortParam } from "./useDecodeSortParam.hook";

interface ISearchParams {
  [key: string]: string | undefined;
}

export const useGetFilters = () => {
  const searchParams = useSearchParams();
  const decodeSortParam = useDecodeSortParam();

  const params = useMemo(() => {
    const paramsQuery = Object.fromEntries(searchParams.entries());
    const result: ISearchParams = {};
    for (const key in paramsQuery) {
      const value = searchParams.get(key);
      if (value) {
        if (key === "sort") {
          const { sortBy, sortOrder } = decodeSortParam(value);
          result["sort_by"] = sortBy;
          result["sort_order"] = sortOrder;
        } else {
          result[key] = value;
        }
      }
    }

    const categoryId = searchParams.get("category_id");
    result["category_id"] = categoryId || undefined;

    return result;
  }, [searchParams, decodeSortParam]);

  return {
    params,
  };
};
