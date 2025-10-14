import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface UpdateParamsProps {
  key: string;
  value: string;
}

export const useUpdateSearchParams = () => {
  const searchParams = useSearchParams();
  const { push } = useRouter();

  const updateSearchParams = useCallback(
    ({ key, value }: UpdateParamsProps) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(key, value);

      push(`?${params.toString()}`, { scroll: false });
    },
    [searchParams, push],
  );

  return updateSearchParams;
};
