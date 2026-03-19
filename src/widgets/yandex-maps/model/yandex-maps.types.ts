import React, { PropsWithChildren } from "react";
import type { YMapProps, YMapMarkerProps } from "@yandex/ymaps3-types";
import { YMapClustererProps } from "@yandex/ymaps3-types/packages/clusterer";

type YMapReactProps = React.PropsWithChildren<YMapProps> & {
  onLocationChange?: (event: any) => void;
};

export type YMapsReactifyComponents = {
  YMap: React.ComponentType<PropsWithChildren<YMapReactProps>>;
  YMapDefaultSchemeLayer: React.ComponentType<{}>;
  YMapDefaultFeaturesLayer?: React.ComponentType<{}>;
  YMapFeature?: React.ComponentType<any>;
  YMapMarker?: React.ComponentType<PropsWithChildren<YMapMarkerProps>>;
  YMapClusterer?: React.ComponentType<PropsWithChildren<YMapClustererProps>>;
  reactify: {
    useDefault: <T>(value: T) => T;
    entity: any
  };
  clusterByGrid: any;
};

declare global {
  interface Window {
    ymaps3?: typeof import("ymaps3");
  }
}

export interface IMarkerBase {
  coordinates: [number, number];
  name: string;
  description: string;
  [key: string]: unknown;
}