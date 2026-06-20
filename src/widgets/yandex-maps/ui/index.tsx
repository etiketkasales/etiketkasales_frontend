"use client";
import React, { useMemo } from "react";
import { useYandexMaps, useYMapsFeatures } from "../lib";

import classes from "./yandex-maps.module.scss";
import YMapsCluster from "./cluster";
import Loader from "~/src/shared/ui/loader";
import type { Feature } from "@yandex/ymaps3-types/packages/clusterer/YMapClusterer";
import { LngLat } from "@yandex/ymaps3-types";
import { IMarkerBase, mapsFallbackLocation } from "../model";

interface MapLocation {
  center: [number, number];
  zoom: number;
}

interface Props<Marker extends IMarkerBase> {
  wrapperClassName?: string;
  children?: React.ReactNode;
  markers?: Marker[];
  location?: MapLocation;
  onMarkerClick?: (markerData: Marker) => void;
  renderMarkerChildren?: (markerData: Marker) => React.ReactNode;
}

export default function YandexMapsWidget<Marker extends IMarkerBase>({
  wrapperClassName,
  children,
  markers,
  location,
  onMarkerClick,
  renderMarkerChildren,
}: Props<Marker>) {
  const { components, loaded, error, userLocation } = useYandexMaps();

  const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer,
    YMapMarker,
    YMapClusterer,
    clusterByGrid,
  } = components;

  const features: Feature[] = useYMapsFeatures({ markers });

  const mapLocation = useMemo(() => {
    if (location) {
      return location;
    }
    if (userLocation) {
      return userLocation;
    }
    return mapsFallbackLocation;
  }, [location, userLocation]);

  const clusterMethod = useMemo(() => {
    return clusterByGrid?.({ gridSize: 256 }) as any;
  }, [clusterByGrid]);

  const useClusterer = Boolean(
    YMapClusterer && clusterMethod && YMapMarker && features.length > 0,
  );

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
    (coordinates: LngLat, clusterFeatures: Feature[]) => (
      <YMapMarker coordinates={coordinates}>
        <YMapsCluster length={clusterFeatures.length} />
      </YMapMarker>
    ),
    [YMapMarker],
  );

  if (error) {
    return (
      <div className={`${wrapperClassName ?? ""} ${classes.loading}`}>
        <p className="text-body s text-neutral-700">{error}</p>
      </div>
    );
  }

  if (!loaded || !YMap) {
    return (
      <div className={`${wrapperClassName ?? ""} ${classes.loading}`}>
        <Loader radius={20} />
      </div>
    );
  }

  return (
    <div className={`${wrapperClassName ?? ""} ${classes.mapRoot}`}>
      <YMap location={mapLocation}>
        <YMapDefaultSchemeLayer />
        {YMapDefaultFeaturesLayer && <YMapDefaultFeaturesLayer />}
        {useClusterer && YMapClusterer ? (
          <YMapClusterer
            method={clusterMethod}
            features={features}
            marker={markerRenderer as any}
            cluster={clusterRenderer as any}
          />
        ) : (
          markers?.map((marker, index) => (
            <YMapMarker
              key={String(marker.key ?? index)}
              coordinates={marker.coordinates}
              onClick={() => onMarkerClick?.(marker)}
            >
              {renderMarkerChildren?.(marker)}
            </YMapMarker>
          ))
        )}
        {YMapMarker && userLocation && !location && (
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
