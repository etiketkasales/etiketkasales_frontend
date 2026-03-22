"use client";
import { useCallback, useEffect, useRef } from "react";
import { useAppDispatch } from "~/src/app/store/hooks";
import { useCreateNotification } from "~/src/widgets/notifications/lib/hooks";

import { setNavigation } from "~/src/app/store/reducers/navigation.slice";

export type UserLocation = {
  center: [number, number];
  zoom: number;
};

const MAX_REFETCH_ATTEMPTS = 3;

export const useUserLocation = () => {
  const dispatch = useAppDispatch();
  const createNotification = useCreateNotification();
  const wasLoaded = useRef<boolean>(false);
  const refetchAttempts = useRef<number>(0);

  const setUserLocation = useCallback(
    (location: UserLocation) => {
      wasLoaded.current = true;
      dispatch(setNavigation({ userLocation: location }));
    },
    [dispatch],
  );

  useEffect(() => {
    if (!navigator.geolocation) {
      createNotification("Геолокация не поддерживается", "error");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        if (
          !wasLoaded.current &&
          refetchAttempts.current <= MAX_REFETCH_ATTEMPTS
        ) {
          setUserLocation({
            center: [pos.coords.longitude, pos.coords.latitude],
            zoom: 14,
          });
        }
        refetchAttempts.current = 0;
      },
      () => {
        if (refetchAttempts.current > MAX_REFETCH_ATTEMPTS) {
          createNotification(
            "Разрешите доступ к геолокации для корректной работы",
            "error",
          );
          refetchAttempts.current++;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      },
    );
  }, [setUserLocation]);
};
