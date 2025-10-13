import { useCallback, useEffect, useMemo, useState } from "react";

interface Props {
  radius: string | number;
  src: string;
}

export const useImageContainer = ({ radius, src }: Props) => {
  const [canLoad, setCanLoad] = useState<boolean>(false);

  const getRadius = useCallback((): string => {
    if (!radius) return "unset";

    if (typeof radius === "number") {
      return `${radius}px`;
    }
    return radius;
  }, [radius]);

  const checkCanLoad = useCallback(
    async (signal: AbortSignal): Promise<boolean> => {
      if (!src) return false;
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
    getRadius,
    canLoad,
  };
};
