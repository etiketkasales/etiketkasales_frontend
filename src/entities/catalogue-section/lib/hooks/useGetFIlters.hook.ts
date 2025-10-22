import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectCatalogue } from "~/src/app/store/reducers/catalogue.slice";

interface ISearchParams {
  [key: string]: string | undefined;
}

export const useGetFilters = () => {
  const searchParams = useSearchParams();
  const { catalogueFiltersKeys } = useAppSelector(selectCatalogue);
  const [params, setParams] = useState<ISearchParams>({});

  useEffect(() => {
    const params: ISearchParams = {};
    catalogueFiltersKeys.forEach((key) => {
      const value = searchParams.get(key);
      if (value) {
        params[key] = value;
      }
    });

    const categoryId = searchParams.get("category_id");
    params["category_id"] = categoryId || undefined;

    if (params) {
      setParams(params);
    }
  }, [searchParams, catalogueFiltersKeys]);

  return {
    params,
  };
};
