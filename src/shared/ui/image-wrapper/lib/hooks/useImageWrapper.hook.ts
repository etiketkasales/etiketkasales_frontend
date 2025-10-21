import { useCallback, useEffect, useState } from "react";

interface Props {
  src: string;
}

export const useImageWrapper = ({ src }: Props) => {
  const [canLoad, setCanLoad] = useState<boolean>(false);

  const checkCanLoad = useCallback(
    async (signal: AbortSignal): Promise<boolean> => {
      if (!src.startsWith("http")) return true;
      try {
        const res = await fetch(src, { signal });
        return res.ok;
      } catch (err) {
        return false;
      }
    },
    [src],
  );

  useEffect(() => {
    const controller = new AbortController();
    checkCanLoad(controller.signal).then(setCanLoad);

    return () => controller.abort();
  }, [src, checkCanLoad]);

  return {
    canLoad,
  };
};
