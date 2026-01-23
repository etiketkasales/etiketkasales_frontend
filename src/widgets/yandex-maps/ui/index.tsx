"use client";
import Script from "next/script";
import { useYandexMaps } from "../lib";

const apiKey = process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY!;
const scriptSrc = `https://api-maps.yandex.ru/v3/?apikey=${apiKey}&lang=ru_RU`;

const fallbackLocation = {
  center: [37.588144, 55.733842] as [number, number],
  zoom: 9,
};

interface Props {
  wrapperClassName?: string;
}

export default function YandexMapsWidget({ wrapperClassName }: Props) {
  const { init, components, loaded, location } = useYandexMaps();

  const mapLocation = location ?? fallbackLocation;

  return (
    <>
      <Script
        src={scriptSrc}
        strategy="afterInteractive"
        onLoad={() => {
          init().catch((err) => console.error("YandexMaps init error", err));
        }}
      />
      <div className={wrapperClassName}>
        {loaded && components ? (
          <components.YMap
            location={
              (components as any).reactify?.useDefault
                ? (components as any).reactify.useDefault(mapLocation)
                : mapLocation
            }
          >
            <components.YMapDefaultSchemeLayer />
            {components.YMapDefaultFeaturesLayer && (
              <components.YMapDefaultFeaturesLayer />
            )}
            {components.YMapMarker && (
              <components.YMapMarker
                coordinates={components.reactify.useDefault(mapLocation.center)}
              >
                <section>Вы здесь</section>
              </components.YMapMarker>
            )}
          </components.YMap>
        ) : (
          <div>Загрузка карты…</div>
        )}
      </div>
    </>
  );
}
