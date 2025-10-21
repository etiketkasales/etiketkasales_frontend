import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectCatalogue } from "~/src/app/store/reducers/catalogue.slice";
import { getProductsByFilters } from "~/src/entities/etiketka/lib/api/etiketka.api";

import { ISearchEtiketka } from "~/src/entities/etiketka/model";

interface ISearchParams {
  [key: string]: string;
}

export const useCatalogueProducts = () => {
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
    params["category_id"] = categoryId || "";
    if (params) {
      setParams(params);
    }
  }, [searchParams, catalogueFiltersKeys]);

  const [products, setProducts] = useState<ISearchEtiketka[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getCatalogueProducts = useCallback(async (params: ISearchParams) => {
    try {
      setLoading(true);
      const res = await getProductsByFilters(params);
      setProducts(res);
    } catch (err) {
      console.error(err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log(params);
    getCatalogueProducts(params);
  }, [getCatalogueProducts, params]);

  return {
    products,
    loading,
  };
};
