import { useCallback, useEffect, useRef, useState } from "react";

export const useYandexMap = <T>() => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedMarker, setSelectedMarker] = useState<T | null>(null);

  useEffect(() => {
    if (!mapRef) return;
  }, []);
};
