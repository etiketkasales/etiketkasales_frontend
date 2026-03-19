import Script from "next/script";

const apiKey = process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY!;
const scriptSrc = `https://api-maps.yandex.ru/v3/?apikey=${apiKey}&lang=ru_RU`;

const clustererScriptSrc =
  "https://unpkg.com/@yandex/ymaps3-clusterer@0.0.12/dist/index.js";

export default function YMapsProvider() {
  return (
    <>
      <Script
        src={scriptSrc}
        strategy="afterInteractive"
        id="yandex-maps-script"
        async
      />
      <Script
        src={clustererScriptSrc}
        strategy="afterInteractive"
        id="clusterer-script"
        async
      />
    </>
  );
}
