import { useCallback, useEffect, useState } from "react";

import { useAppSelector } from "~/src/app/store/hooks";
import { selectNavigation } from "~/src/app/store/reducers/navigation.slice";

import { loadYandexMaps } from "../loadYandexMaps";
import {
  mapsFallbackLocation,
  yMapsComponentsSkeleton,
  YMapsReactifyComponents,
} from "../../model";

export const useYandexMaps = () => {
  const [components, setComponents] = useState<YMapsReactifyComponents>(
    yMapsComponentsSkeleton,
  );
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { userLocation } = useAppSelector(selectNavigation);

  const mapLocation = userLocation || mapsFallbackLocation;

  const init = useCallback(async () => {
    try {
      setError(null);
      const comps = await loadYandexMaps();
      setComponents(comps);
      setLoaded(true);
    } catch (err) {
      console.error("[YandexMaps] init failed", err);
      setError(
        err instanceof Error ? err.message : "Не удалось загрузить карту",
      );
      setLoaded(false);
    }
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  return {
    init,
    components,
    loaded,
    error,
    userLocation,
    mapLocation,
  };
};
