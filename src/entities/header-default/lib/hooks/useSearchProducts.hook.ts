import { useCallback, useEffect, useRef, useState } from "react";
import { searchProductsByInput } from "~/src/entities/etiketka/lib/api/etiketka.api";
import { ISearchEtiketka } from "~/src/entities/etiketka/model";
import { promiseWrapper } from "~/src/shared/lib";

export const useSearchProducts = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<ISearchEtiketka[]>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getProducts = useCallback(async (query: string) => {
    await promiseWrapper({
      setLoading,
      callback: async () => {
        const res = await searchProductsByInput(query);
        if (res && Array.isArray(res)) {
          setProducts(res.products);
        }
      },
    });
  }, []);

  const onInputChange = useCallback(
    (q: string) => {
      if (!q || q.length < 3) return;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        getProducts(q);
      }, 500);
    },
    [getProducts],
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return {
    loading,
    products,
    onInputChange,
  };
};
