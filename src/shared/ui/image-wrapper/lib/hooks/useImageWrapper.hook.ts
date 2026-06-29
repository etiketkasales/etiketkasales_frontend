import { useCallback, useMemo } from "react";
import { resolveUploadMediaUrl } from "~/src/shared/lib/utils/media-url.util";

interface Props {
  src: string;
}

function isRenderableSrc(src: string | undefined): boolean {
  if (!src) return false;
  const t = src.trim();
  return !(!t || t === "null" || t === "undefined");
}

export const useImageWrapper = ({ src }: Props) => {
  const canLoad = useMemo(() => isRenderableSrc(src), [src]);

  const safeImageSrc = useCallback(
    (fallbackImage: string, src?: string): string => {
      if (!src) return fallbackImage;

      const trimmed = src.trim();

      if (!trimmed) return fallbackImage;
      if (trimmed === "null" || trimmed === "undefined") return fallbackImage;

      if (trimmed.startsWith("/")) {
        return resolveUploadMediaUrl(trimmed);
      }

      try {
        new URL(trimmed);
        return resolveUploadMediaUrl(trimmed);
      } catch {
        return fallbackImage;
      }
    },
    [],
  );

  return {
    canLoad,
    safeImageSrc,
  };
};
