import { YMapsReactifyComponents } from "./yandex-maps.types";

export const mapsFallbackLocation = {
  center: [37.588144, 55.733842] as [number, number],
  zoom: 9,
};

export const yMapsComponentsSkeleton: YMapsReactifyComponents = {
  YMap: () => null,
  YMapDefaultSchemeLayer: () => null,
  YMapDefaultFeaturesLayer: () => null,
  YMapFeature: () => null,
  YMapMarker: () => null,
  YMapClusterer: () => null,
  reactify: null,
  clusterByGrid: () => null,
};
