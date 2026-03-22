"use client";
import React, { useMemo } from "react";
import { useYandexMaps, useYMapsFeatures } from "../lib";

import classes from "./yandex-maps.module.scss";
import YMapsCluster from "./cluster";
import type { Feature } from "@yandex/ymaps3-types/packages/clusterer/YMapClusterer";
import { LngLat } from "@yandex/ymaps3-types";
import { IMarkerBase } from "../model";

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
  const { components, loaded, userLocation, stableLocation } = useYandexMaps();

  const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer,
    YMapMarker,
    YMapClusterer,
    clusterByGrid,
  } = components;

  const features: Feature[] = useYMapsFeatures({ markers });

  const clusterMethod = useMemo(() => {
    return clusterByGrid?.({ gridSize: 256 });
  }, [clusterByGrid]);

  const markerRenderer = React.useCallback(
    (feature: Feature) => (
      <YMapMarker
        coordinates={feature.geometry.coordinates}
        onClick={() => onMarkerClick?.(feature.properties as Marker)}
      >
        {renderMarkerChildren?.(feature.properties as Marker)}
      </YMapMarker>
    ),
    [onMarkerClick, renderMarkerChildren, YMapMarker],
  );

  const clusterRenderer = React.useCallback(
    (coordinates: LngLat, features: Feature[]) => (
      <YMapMarker coordinates={coordinates}>
        <YMapsCluster length={features.length} />
      </YMapMarker>
    ),
    [YMapMarker],
  );

  if (!components || !stableLocation || !loaded) {
    return null;
  }

  return (
    <div className={wrapperClassName}>
      <YMap location={stableLocation}>
        <YMapDefaultSchemeLayer />
        {YMapDefaultFeaturesLayer && <YMapDefaultFeaturesLayer />}
        {features && YMapClusterer && YMapMarker && (
          <YMapClusterer
            method={clusterMethod}
            features={features}
            marker={markerRenderer as any}
            cluster={clusterRenderer as any}
          />
        )}
        {YMapMarker && userLocation && (
          <YMapMarker coordinates={userLocation.center}>
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
