"use client";

import { useEffect } from "react";

import { loadYandexMaps21 } from "../../lib/loadYandexMaps21";

const apiKey = process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY?.trim() ?? "";

export default function YMapsProvider() {
  useEffect(() => {
    if (!apiKey) {
      return;
    }

    loadYandexMaps21(apiKey).catch((error) => {
      console.error("[YandexMaps21] preload failed", error);
    });
  }, []);

  return null;
}
