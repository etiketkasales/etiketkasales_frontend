import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface UpdateParamsProps {
  key: string;
  value: string | null;
  initialPathname?: string;
}

export const useUpdateSearchParams = () => {
  const searchParams = useSearchParams();
  const { push } = useRouter();

  const updateSearchParams = useCallback(
    ({ key, value, initialPathname }: UpdateParamsProps) => {
      if (!value) {
        if (initialPathname) {
          push(initialPathname, { scroll: false });
        }
        return;
      }
      const params = new URLSearchParams(searchParams.toString());
      params.set(key, value);

      push(`?${params.toString()}`, { scroll: false });
    },
    [searchParams, push],
  );

  return updateSearchParams;
};
