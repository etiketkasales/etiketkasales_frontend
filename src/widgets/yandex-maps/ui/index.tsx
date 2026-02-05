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
          {components.YMapFeature && markers && (
            markers.map((item, index) => (
              <components.YMapFeature
                key={`${index}-${item.coordinates[0]}`}
                geometry={{
                  type: "Point",
                  coordinates: item.coordinates,
                }}
                style={{
                  icon: {
                    layout: "default#image",
                    imageSize: [32, 32],
                    imageOffset: [-16, -16]
                  }
                }}
                onClick={() => onMarkerClick?.(item)}
              >

              </components.YMapFeature>
            ))
          )}
        </components.YMap>
      ) : (
        <div>Загрузка карты…</div>
      )}
      {children}
    </div>
  );
}
