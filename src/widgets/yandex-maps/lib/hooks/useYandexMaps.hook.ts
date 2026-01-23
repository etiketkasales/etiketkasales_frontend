import React, { useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { YMapsReactifyComponents } from "../../model";
import { useUserLocation } from "~/src/shared/lib";

export const useYandexMaps = () => {
  const [components, setComponents] = useState<YMapsReactifyComponents | null>(
    null,
  );
  const [loaded, setLoaded] = useState<boolean>(false);
  const { location, error } = useUserLocation();

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
      reactify,
    });
    setLoaded(true);
  }, []);

  return {
    init,
    components,
    loaded,
    location: error ? null : location,
  };
};
