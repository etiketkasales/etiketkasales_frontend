import React, { PropsWithChildren } from "react";
import type { YMapProps, YMapMarkerProps } from "@yandex/ymaps3-types";
import { DefaultMarkerCustomProps } from "@yandex/ymaps3-types/packages/markers/YMapDefaultMarker";

type YMapReactProps = React.PropsWithChildren<YMapProps> & {
  onLocationChange?: (event: any) => void;
};

export type YMapsReactifyComponents = {
  YMap: React.ComponentType<PropsWithChildren<YMapReactProps>>;
  YMapDefaultSchemeLayer: React.ComponentType<{}>;
  YMapDefaultFeaturesLayer?: React.ComponentType<{}>;
  YMapFeature?: React.ComponentType<any>;
  YMapMarker?: React.ComponentType<PropsWithChildren<YMapMarkerProps>>;
  reactify: {
    useDefault: <T>(value: T) => T;
  };
};

declare global {
  interface Window {
    ymaps3?: typeof import("ymaps3");
  }
}
