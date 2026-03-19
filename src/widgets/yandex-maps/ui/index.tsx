"use client";
import React from "react";
import { useYandexMaps } from "../lib";
import type { Feature } from "@yandex/ymaps3-types/packages/clusterer/YMapClusterer";

import classes from "./yandex-maps.module.scss";
import { IMarkerBase, mapsFallbackLocation } from "../model";

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

  const mapLocation = location ?? mapsFallbackLocation;

  const stableLocation = React.useMemo(() => {
    if (!components) return null;
    return components.reactify?.useDefault(mapLocation);
  }, [components, mapLocation]);

  if (!loaded) {
    return null;
  }

  if (!components || !stableLocation) {
    return (
      <p className={`text-neutral-800 text-body xl`}>
        Не удалось загрузить карту
      </p>
    );
  }

  const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer,
    YMapMarker,
    YMapClusterer,
    reactify,
    clusterByGrid,
  } = components;

  const features: Feature[] | undefined = markers?.map((marker, index) => ({
    type: "Feature",
    id: `${index}`,
    geometry: {
      type: "Point",
      coordinates: marker.coordinates,
    },
    properties: marker,
  }));

  console.log(components);

  return (
    <div className={wrapperClassName}>
      <YMap location={stableLocation} onLocationChange={onMapChange}>
        <YMapDefaultSchemeLayer />
        {YMapDefaultFeaturesLayer && <YMapDefaultFeaturesLayer />}
        {features && YMapClusterer && YMapMarker && (
          <YMapClusterer
            method={clusterByGrid?.({ gridSize: 64 })}
            features={features}
            marker={(feature) => {
              const comp = (
                <YMapMarker
                  coordinates={feature.geometry.coordinates}
                  onClick={() => onMarkerClick?.(feature.properties as Marker)}
                >
                  {renderMarkerChildren?.(feature.properties as Marker)}
                </YMapMarker>
              );

              return reactify.entity(comp)();
            }}
            cluster={(coordinates, features) => {
              const el = (
                <YMapMarker coordinates={coordinates}>
                  <div className={classes.cluster}>{features.length}</div>
                </YMapMarker>
              );
              return reactify.entity(el)();
            }}
          />
        )}
        {/* {YMapMarker && stableLocation && (
          <YMapMarker coordinates={stableLocation.center}>
            <div
              className={`flex-column gap-1 align-center ${classes.meContainer}`}
            >
              <div className={classes.me}></div>
              <span className="text-neutral-1000 text-body xs nowrap-text">
                Вы здесь
              </span>
            </div>
          </YMapMarker>
        )} */}
      </YMap>
      {children}
    </div>
  );
}
