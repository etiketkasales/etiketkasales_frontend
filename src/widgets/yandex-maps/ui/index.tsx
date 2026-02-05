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
  renderMarkerChildren?: (markerData: Marker) => React.ReactNode;
}

export default function YandexMapsWidget<Marker extends IMarkerBase>({
  wrapperClassName,
  children,
  markers,
  onMarkerClick,
  renderMarkerChildren,
}: Props<Marker>) {
  const { components, loaded, location, onMapChange } = useYandexMaps();

  const mapLocation = location ?? fallbackLocation;

  const stableLocation = React.useMemo(() => {
    if (!components) return null;
    return components.reactify.useDefault(mapLocation);
  }, [components, mapLocation]);

  if (!loaded) {
    return <p className={`text-neutral-800 text-body xl`}>Загрузка карты…</p>;
  }

  if (!components || !stableLocation) {
    return (
      <p className={`text-neutral-800 text-body xl`}>
        Не удалось загрузить карту
      </p>
    );
  }

  const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } =
    components;

  return (
    <div className={wrapperClassName}>
      <YMap location={stableLocation} onLocationChange={onMapChange}>
        <YMapDefaultSchemeLayer />
        {YMapDefaultFeaturesLayer && <YMapDefaultFeaturesLayer />}
        {markers &&
          YMapMarker &&
          markers.map((marker, index) => (
            <YMapMarker
              key={`${marker.coordinates.toString()}-${index}`}
              coordinates={marker.coordinates}
              onClick={() => onMarkerClick?.(marker)}
            >
              {renderMarkerChildren?.(marker)}
            </YMapMarker>
          ))}
        {YMapMarker && location && (
          <YMapMarker coordinates={location.center}>
            <div
              className={`flex-column gap-1 align-center ${classes.meContainer}`}
            >
              <div className={classes.me}></div>
              <span className="text-neutral-1000 text-body xs nowrap-text">
                Вы здесь
              </span>
            </div>
          </YMapMarker>
        )}
      </YMap>
      {children}
    </div>
  );
}
