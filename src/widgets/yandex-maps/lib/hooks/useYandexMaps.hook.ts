import React, { useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { useAppDispatch } from "~/src/app/store/hooks";
import { useUserLocation } from "~/src/shared/lib";
import { addNotification } from "~/src/app/store/reducers/notifications.slice";

import { YMapsReactifyComponents } from "../../model";

export const useYandexMaps = () => {
  const dispatch = useAppDispatch();
  const [components, setComponents] = useState<YMapsReactifyComponents | null>(
    null,
  );
  const [loaded, setLoaded] = useState<boolean>(false);
  const [zoom, setZoom] = useState<number>(9);
  const { location, error, isLoading: loadingLocation } = useUserLocation();

  const init = useCallback(async () => {
    if (typeof window === "undefined") return;
    if (!(window as any).ymaps3) return;

    const ymaps3 = (window as any).ymaps3;

    await ymaps3.ready;
    const [ymaps3React] = await Promise.all([
      ymaps3.import("@yandex/ymaps3-reactify"),
      ymaps3.ready,
    ]);

    const reactify = ymaps3React.reactify.bindTo(React, ReactDOM);
    const comps = reactify.module(ymaps3);

    setComponents({
      YMap: comps.YMap,
      YMapDefaultSchemeLayer: comps.YMapDefaultSchemeLayer,
      YMapDefaultFeaturesLayer: comps.YMapDefaultFeaturesLayer,
      YMapMarker: comps.YMapMarker,
      YMapFeature: comps.YMapFeature,
      reactify,
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
    location: error ? null : location,
    onMapChange,
  };
};
