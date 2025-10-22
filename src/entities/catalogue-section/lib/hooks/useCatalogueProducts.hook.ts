import { useCallback, useEffect, useState } from "react";
import { useGetFilters } from "./useGetFIlters.hook";
import { getProductsByFilters } from "~/src/entities/etiketka/lib/api/etiketka.api";

import { ISearchEtiketka } from "~/src/entities/etiketka/model";

interface ISearchParams {
  [key: string]: string | undefined;
}

export const useCatalogueProducts = () => {
  const { params } = useGetFilters();
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
    getCatalogueProducts(params);
  }, [getCatalogueProducts, params]);

  return {
    products,
    loading,
  };
};
