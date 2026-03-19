import React, { useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { useAppSelector } from "~/src/app/store/hooks";
import { selectNavigation } from "~/src/app/store/reducers/navigation.slice";

import { YMapsReactifyComponents } from "../../model";

export const useYandexMaps = () => {
  const [components, setComponents] = useState<YMapsReactifyComponents | null>(
    null,
  );
  const [loaded, setLoaded] = useState<boolean>(false);
  const [zoom, setZoom] = useState<number>(9);

  const { userLocation } = useAppSelector(selectNavigation);

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
    const { YMapClusterer, clusterByGrid } = reactify.module(
      await ymaps3["@yandex/ymaps3-clusterer"],
    );

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

  const onMapChange = useCallback((e: any) => {
    if (e.location?.zoom) {
      setZoom(e.location.zoom);
    }
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
    onMapChange,
    location: userLocation,
  };
};
