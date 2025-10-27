import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

interface ISearchParams {
  [key: string]: string | undefined;
}

export const useGetFilters = () => {
  const searchParams = useSearchParams();

  const params = useMemo(() => {
    const paramsQuery = Object.fromEntries(searchParams.entries());
    const result: ISearchParams = {};
    for (const key in paramsQuery) {
      const value = searchParams.get(key);
      if (value) {
        result[key] = value;
      }
    }

    const categoryId = searchParams.get("category_id");
    result["category_id"] = categoryId || undefined;

    return result;
  }, [searchParams]);

  return {
    params,
  };
};
