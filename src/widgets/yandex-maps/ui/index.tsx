"use client";
import React from "react";
import { useYandexMaps } from "../lib";

import classes from "./yandex-maps.module.scss";

const fallbackLocation = {
  center: [37.588144, 55.733842] as [number, number],
  zoom: 9,
};

interface IMarkerBase {
  coordinates: [number, number];
}

interface Props<Marker extends IMarkerBase> {
  wrapperClassName?: string;
  children?: React.ReactNode;
  markers?: Marker[];

  onMarkerClick?: (markerData: Marker) => void;
}

export default function YandexMapsWidget<Marker extends IMarkerBase>({
  wrapperClassName,
  children,
  markers,
  onMarkerClick,
}: Props<Marker>) {
  const { components, loaded, location } = useYandexMaps();

  const mapLocation = location ?? fallbackLocation;

  const stableLocation = React.useMemo(() => {
    if (!components) return null;
    return components.reactify.useDefault(mapLocation);
  }, [components, mapLocation]);

  return (
    <div className={wrapperClassName}>
      {loaded && components ? (
        <components.YMap location={stableLocation}>
          <components.YMapDefaultSchemeLayer />
          {components.YMapDefaultFeaturesLayer && (
            <components.YMapDefaultFeaturesLayer />
          )}
          {components.YMapMarker && (
            <components.YMapMarker
              coordinates={components.reactify.useDefault(mapLocation.center)}
            >
              <div className={classes.me}></div>
            </components.YMapMarker>
          )}
        </components.YMap>
      ) : (
        <div>Загрузка карты…</div>
      )}
      {children}
    </div>
  );
}
