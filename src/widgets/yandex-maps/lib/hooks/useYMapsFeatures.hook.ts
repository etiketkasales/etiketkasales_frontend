import { useMemo } from "react";

import type { Feature } from "@yandex/ymaps3-types/packages/clusterer/YMapClusterer";
import { IMarkerBase } from "../../model";

interface Props<M extends IMarkerBase> {
  markers?: M[];
}

export const useYMapsFeatures = <M extends IMarkerBase>({
  markers,
}: Props<M>) => {
  return useMemo((): Feature[] => {
    return (
      markers?.map((marker, index) => ({
        type: "Feature",
        id: `${index}`,
        geometry: {
          type: "Point",
          coordinates: marker.coordinates,
        },
        properties: marker,
      })) || []
    );
  }, [markers]);
};
