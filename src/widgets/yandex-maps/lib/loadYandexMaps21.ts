declare global {
  interface Window {
    ymaps?: {
      ready: (callback: () => void) => void;
      Map: new (
        element: HTMLElement,
        state: { center: number[]; zoom: number; controls?: string[] },
        options?: Record<string, unknown>,
      ) => YmapsMapInstance;
      Placemark: new (
        coords: number[],
        properties?: Record<string, unknown>,
        options?: Record<string, unknown>,
      ) => YmapsPlacemarkInstance;
    };
  }
}

export interface YmapsPlacemarkInstance {
  events: { add: (event: string, handler: () => void) => void };
}

export interface YmapsMapInstance {
  geoObjects: {
    add: (object: YmapsPlacemarkInstance) => void;
    getBounds: () => number[][];
  };
  setBounds: (bounds: number[][], options?: Record<string, unknown>) => void;
  destroy: () => void;
}

let loadPromise: Promise<NonNullable<Window["ymaps"]>> | null = null;

export function loadYandexMaps21(
  apiKey: string,
): Promise<NonNullable<Window["ymaps"]>> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Yandex Maps 2.1: browser only"));
  }

  if (window.ymaps) {
    return new Promise((resolve) => {
      window.ymaps!.ready(() => resolve(window.ymaps!));
    });
  }

  if (loadPromise) {
    return loadPromise;
  }

  loadPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://api-maps.yandex.ru/2.1/?apikey=${encodeURIComponent(apiKey)}&lang=ru_RU`;
    script.async = true;
    script.dataset.yandexMaps = "2.1";

    script.onload = () => {
      if (!window.ymaps) {
        loadPromise = null;
        reject(new Error("Yandex Maps 2.1: ymaps is undefined after load"));
        return;
      }

      window.ymaps.ready(() => resolve(window.ymaps!));
    };

    script.onerror = () => {
      loadPromise = null;
      reject(
        new Error(
          "Yandex Maps 2.1: не удалось загрузить скрипт. Проверьте ключ и ограничения Referer.",
        ),
      );
    };

    document.head.appendChild(script);
  });

  return loadPromise;
}
