import React from "react";
import * as ReactDOMClient from "react-dom/client";

export async function initYmapsReactify(ymaps3: any) {
  const [ymaps3React] = await Promise.all([
    ymaps3.import("@yandex/ymaps3-reactify"),
    ymaps3.ready,
  ]);

  const reactify = ymaps3React.reactify.bindTo(React, ReactDOMClient);

  return reactify.module(ymaps3) as {
    YMap: React.FC<any>;
    YMapDefaultSchemeLayer: React.FC<any>;
    YMapDefaultFeaturesLayer: React.FC<any>;
    YMapMarker: React.FC<any>;
  };
}

export * from "./utils";
export * from "./hooks";
