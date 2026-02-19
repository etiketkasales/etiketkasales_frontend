import { useCallback, useEffect, useState } from "react";
import { useGetFilters } from ".";
import { getProductsByFilters } from "~/src/entities/etiketka/lib/api/etiketka.api";

import { ISearchEtiketka } from "~/src/entities/etiketka/model";

interface ISearchParams {
  [key: string]: string | undefined;
}

export const useCatalogueProducts = () => {
  const { params } = useGetFilters();
  const [products, setProducts] = useState<ISearchEtiketka[]>([]);
  const [paginationPage, setPaginationPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const updateProducts = useCallback((newProducts: ISearchEtiketka[]) => {
    setProducts((prev) => {
      const currentIds = prev.map((p) => p.id);
      const newProds = newProducts.filter((p) => !currentIds.includes(p.id));
      return [...prev, ...newProds];
    });
  }, []);

  const getCatalogueProducts = useCallback(
    async (params: ISearchParams) => {
      try {
        setLoading(true);
        const res = await getProductsByFilters(params);
        if (res.products) {
          updateProducts(res.products);
        }
      } catch (err) {
        console.error(err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    },
    [updateProducts],
  );

  useEffect(() => {
    getCatalogueProducts({ ...params, page: paginationPage.toString() });
  }, [getCatalogueProducts, params, paginationPage]);

  return {
    products,
    setPaginationPage,
    paginationPage,
    loading,
  };
};
