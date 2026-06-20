"use client";

import { useEffect, useRef, useState } from "react";

import Loader from "~/src/shared/ui/loader";
import type { IOrderPickupPointResponse } from "~/src/entities/order/model";
import { loadYandexMaps21, YmapsMapInstance } from "../../lib/loadYandexMaps21";

import classes from "./maps21.module.scss";

interface Props {
  className?: string;
  points: IOrderPickupPointResponse[];
  onPointClick: (point: IOrderPickupPointResponse) => void;
  children?: React.ReactNode;
}

function getMapCenter(points: IOrderPickupPointResponse[]) {
  const valid = points.filter(
    (point) =>
      Number.isFinite(point.latitude) && Number.isFinite(point.longitude),
  );

  if (valid.length === 0) {
    return { center: [55.7558, 37.6173] as [number, number], zoom: 9 };
  }

  if (valid.length === 1) {
    return {
      center: [valid[0].latitude, valid[0].longitude] as [number, number],
      zoom: 13,
    };
  }

  const avgLat =
    valid.reduce((sum, point) => sum + point.latitude, 0) / valid.length;
  const avgLng =
    valid.reduce((sum, point) => sum + point.longitude, 0) / valid.length;

  return {
    center: [avgLat, avgLng] as [number, number],
    zoom: 11,
  };
}

export default function YandexMaps21Widget({
  className,
  points,
  onPointClick,
  children,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<YmapsMapInstance | null>(null);
  const onPointClickRef = useRef(onPointClick);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY?.trim() ?? "";

  useEffect(() => {
    onPointClickRef.current = onPointClick;
  }, [onPointClick]);

  useEffect(() => {
    if (!apiKey || points.length === 0 || !containerRef.current) {
      return;
    }

    let cancelled = false;

    setReady(false);
    setError(null);

    loadYandexMaps21(apiKey)
      .then((ymaps) => {
        if (cancelled || !containerRef.current) {
          return;
        }

        mapRef.current?.destroy();
        mapRef.current = null;

        const valid = points.filter(
          (point) =>
            Number.isFinite(point.latitude) && Number.isFinite(point.longitude),
        );

        const { center, zoom } = getMapCenter(valid);
        const map = new ymaps.Map(
          containerRef.current,
          {
            center,
            zoom,
            controls: ["zoomControl"],
          },
          {
            suppressMapOpenBlock: true,
          },
        );

        valid.forEach((point) => {
          const placemark = new ymaps.Placemark(
            [point.latitude, point.longitude],
            {
              balloonContentHeader: point.name,
              balloonContentBody: point.full_address,
              hintContent: point.name,
            },
            {
              preset: "islands#yellowDotIcon",
            },
          );

          placemark.events.add("click", () => onPointClickRef.current(point));
          map.geoObjects.add(placemark);
        });

        if (valid.length > 1) {
          const bounds = map.geoObjects.getBounds();
          if (bounds) {
            map.setBounds(bounds, {
              checkZoomRange: true,
              zoomMargin: 48,
            });
          }
        }

        mapRef.current = map;
        setReady(true);
      })
      .catch((err) => {
        if (cancelled) {
          return;
        }

        console.error("[YandexMaps21]", err);
        setError(
          err instanceof Error
            ? err.message
            : "Не удалось загрузить карту Яндекса",
        );
      });

    return () => {
      cancelled = true;
      mapRef.current?.destroy();
      mapRef.current = null;
    };
  }, [apiKey, points]);

  return (
    <div className={`${className ?? ""} ${classes.root}`}>
      {!ready && !error && (
        <div className={classes.loading}>
          <Loader radius={20} />
        </div>
      )}

      {error && (
        <div className={classes.loading}>
          <p className="text-body s text-neutral-700">{error}</p>
        </div>
      )}

      <div ref={containerRef} className={classes.canvas} />
      {children}
    </div>
  );
}
