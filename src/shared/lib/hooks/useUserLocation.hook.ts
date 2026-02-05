"use client";

import { useEffect, useState } from "react";

export type UserLocation = {
  center: [number, number];
  zoom: number;
};

export const useUserLocation = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    if (!navigator.geolocation) {
      setError("Геолокация не поддерживается");
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          center: [pos.coords.longitude, pos.coords.latitude],
          zoom: 14,
        });
        setIsLoading(false);
      },
      () => {
        setError("Доступ к геолокации запрещён");
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      },
    );
  }, []);

  return { location, error, isLoading };
};
