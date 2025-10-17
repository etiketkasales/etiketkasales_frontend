import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";

interface UpdateParamsProps {
  key: string;
  value: string | null;
  replace?: boolean; // чтобы можно было выбирать push или replace
}

export const useUpdateSearchParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateSearchParams = useCallback(
    ({ key, value, replace = false }: UpdateParamsProps) => {
      const params = new URLSearchParams(searchParams.toString());

      if (!value) {
        params.delete(key);
      } else {
        const prevValue = params.get(key);
        if (prevValue) {
          const items = new Set(prevValue.split(","));
          items.add(value);
          params.set(key, Array.from(items).join(","));
        } else {
          params.set(key, value);
        }
      }

      const newUrl = `${pathname}?${params.toString()}`;
      if (replace) {
        router.replace(newUrl, { scroll: false });
      } else {
        router.push(newUrl, { scroll: false });
      }
    },
    [pathname, searchParams, router],
  );

  return updateSearchParams;
};
