import React from "react";

export type YMapsReactifyComponents = {
  YMap: React.ComponentType<any>;
  YMapDefaultSchemeLayer: React.ComponentType<any>;
  YMapDefaultFeaturesLayer?: React.ComponentType<any>;
  YMapMarker?: React.ComponentType<any>;
  reactify: {
    useDefault: <T>(value: T) => T;
  };
};

declare global {
  interface Window {
    ymaps3?: typeof import("ymaps3");
  }
}
