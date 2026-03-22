import React, { PropsWithChildren } from "react";
import type { YMapProps, YMapMarkerProps } from "@yandex/ymaps3-types";
import { YMapClustererProps } from "@yandex/ymaps3-types/packages/clusterer";
import { Reactify } from "@yandex/ymaps3-types/reactify";

type YMapReactProps = React.PropsWithChildren<YMapProps> & {
  onLocationChange?: (event: any) => void;
};

export type YMapsReactifyComponents = {
  YMap: React.ComponentType<PropsWithChildren<YMapReactProps>>;
  YMapDefaultSchemeLayer: React.ComponentType<{}>;
  YMapDefaultFeaturesLayer: React.ComponentType<{}>;
  YMapFeature: React.ComponentType<any>;
  YMapMarker: React.ComponentType<PropsWithChildren<YMapMarkerProps>>;
  YMapClusterer: React.ComponentType<PropsWithChildren<YMapClustererProps>>;
  reactify: Reactify | null;
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
