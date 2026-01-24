import Script from "next/script";

const apiKey = process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY!;
const scriptSrc = `https://api-maps.yandex.ru/v3/?apikey=${apiKey}&lang=ru_RU`;

export default function YMapsProvider() {
  return <Script src={scriptSrc} strategy="afterInteractive" />;
}
