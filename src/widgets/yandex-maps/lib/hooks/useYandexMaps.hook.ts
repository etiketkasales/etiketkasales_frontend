import React, { useCallback, useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom";

import { useAppSelector } from "~/src/app/store/hooks";
import { selectNavigation } from "~/src/app/store/reducers/navigation.slice";

import {
  mapsFallbackLocation,
  yMapsComponentsSkeleton,
  YMapsReactifyComponents,
} from "../../model";

export const useYandexMaps = () => {
  const [components, setComponents] = useState<YMapsReactifyComponents>(
    yMapsComponentsSkeleton,
  );
  const [loaded, setLoaded] = useState<boolean>(false);
  const { userLocation } = useAppSelector(selectNavigation);

  const mapLocation = userLocation || mapsFallbackLocation;

  const stableLocation = useMemo(() => {
    if (!components) return null;
    return components.reactify?.useDefault(mapLocation);
  }, [components, mapLocation]);

  const init = useCallback(async () => {
    if (typeof window === "undefined") return;
    if (!(window as any).ymaps3) return;

    const ymaps3 = await (window as any).ymaps3;

    await ymaps3.ready;
    const [ymaps3React] = await Promise.all([
      ymaps3.import("@yandex/ymaps3-reactify"),
      ymaps3.ready,
    ]);

    const reactify = ymaps3React.reactify.bindTo(React, ReactDOM);
    const comps = reactify.module(ymaps3);

    ymaps3.import.registerCdn(
      "https://cdn.jsdelivr.net/npm/{package}",
      "@yandex/ymaps3-clusterer@latest",
    );
    const clustererModule = await ymaps3.import("@yandex/ymaps3-clusterer");
    const { YMapClusterer, clusterByGrid } = reactify.module(clustererModule);

    setComponents({
      YMap: comps.YMap,
      YMapDefaultSchemeLayer: comps.YMapDefaultSchemeLayer,
      YMapDefaultFeaturesLayer: comps.YMapDefaultFeaturesLayer,
      YMapMarker: comps.YMapMarker,
      YMapFeature: comps.YMapFeature,
      reactify,
      YMapClusterer: YMapClusterer,
      clusterByGrid,
    });
    setLoaded(true);
  }, []);

  useEffect(() => {
    if ((window as any).ymaps3) {
      init().catch(console.error);
    }
  }, [init]);

  return {
    init,
    components,
    loaded,
    userLocation,
    stableLocation,
  };
};
