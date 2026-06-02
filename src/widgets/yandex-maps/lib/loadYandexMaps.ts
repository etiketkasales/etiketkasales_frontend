import React from "react";
import * as ReactDOM from "react-dom";

import { YMapsReactifyComponents } from "../model";

let initPromise: Promise<YMapsReactifyComponents> | null = null;

function waitForYmaps3(
  timeoutMs = 20000,
): Promise<NonNullable<Window["ymaps3"]>> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Yandex Maps: browser only"));
      return;
    }

    const finish = () => {
      if (window.ymaps3) {
        resolve(window.ymaps3);
        return true;
      }
      return false;
    };

    if (finish()) {
      return;
    }

    const onLoaded = () => {
      if (finish()) {
        cleanup();
      }
    };

    const timer = window.setTimeout(() => {
      cleanup();
      reject(new Error("Yandex Maps: script load timeout"));
    }, timeoutMs);

    const poll = window.setInterval(() => {
      if (finish()) {
        cleanup();
      }
    }, 100);

    const cleanup = () => {
      window.clearTimeout(timer);
      window.clearInterval(poll);
      window.removeEventListener("ymaps3-loaded", onLoaded);
    };

    window.addEventListener("ymaps3-loaded", onLoaded);
  });
}

async function loadClusterer(
  ymaps3: NonNullable<Window["ymaps3"]>,
  reactify: YMapsReactifyComponents["reactify"],
): Promise<Pick<YMapsReactifyComponents, "YMapClusterer" | "clusterByGrid">> {
  if (!reactify) {
    return {
      YMapClusterer: null,
      clusterByGrid: null,
    };
  }

  try {
    ymaps3.import.registerCdn(
      "https://cdn.jsdelivr.net/npm/{package}",
      "@yandex/ymaps3-clusterer@0.0.12",
    );
    const clustererModule = await ymaps3.import(
      "@yandex/ymaps3-clusterer" as "@yandex/ymaps3-reactify",
    );
    const clustererComps = reactify.module(clustererModule as never);

    return {
      YMapClusterer:
        clustererComps.YMapClusterer as YMapsReactifyComponents["YMapClusterer"],
      clusterByGrid:
        clustererComps.clusterByGrid as YMapsReactifyComponents["clusterByGrid"],
    };
  } catch (error) {
    console.warn(
      "[YandexMaps] clusterer load failed, using plain markers",
      error,
    );
    return {
      YMapClusterer: null,
      clusterByGrid: null,
    };
  }
}

export async function loadYandexMaps(): Promise<YMapsReactifyComponents> {
  if (initPromise) {
    return initPromise;
  }

  initPromise = (async () => {
    const ymaps3 = await waitForYmaps3();
    await ymaps3.ready;

    const ymaps3React = await ymaps3.import("@yandex/ymaps3-reactify");
    const reactify = ymaps3React.reactify.bindTo(React, ReactDOM);
    const comps = reactify.module(ymaps3);
    const clusterer = await loadClusterer(ymaps3, reactify);

    return {
      YMap: comps.YMap,
      YMapDefaultSchemeLayer: comps.YMapDefaultSchemeLayer,
      YMapDefaultFeaturesLayer: comps.YMapDefaultFeaturesLayer,
      YMapMarker: comps.YMapMarker,
      YMapFeature: comps.YMapFeature,
      reactify,
      YMapClusterer: clusterer.YMapClusterer,
      clusterByGrid: clusterer.clusterByGrid,
    };
  })().catch((error) => {
    initPromise = null;
    throw error;
  });

  return initPromise;
}
