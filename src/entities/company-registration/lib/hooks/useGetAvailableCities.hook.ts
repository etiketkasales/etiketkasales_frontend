import { useCallback, useState } from "react";
import { useCreateNotification } from "~/src/widgets/notifications/lib/hooks";

import { promiseWrapper } from "~/src/shared/lib";
import { getAvailableCities } from "../api";

import { IAvailableCity } from "../../model";
import { IFormModalSelectOption } from "~/src/entities/form-modal/model";
import { useDebounce } from "react-use";

export const useGetAvailableCities = (enabled = true) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [availableCities, setAvailableCities] = useState<
    IFormModalSelectOption[]
  >([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const createNotification = useCreateNotification();

  const formatCities = useCallback((cities: IAvailableCity[]) => {
    return cities.map((city) => ({
      value: city.slug,
      label: city.name,
    }));
  }, []);

  const fetchCities = useCallback(
    async (query: string) => {
      if (!enabled) {
        return;
      }

      await promiseWrapper({
        setLoading,
        callback: async () => {
          const res: { cities: IAvailableCity[] } | undefined =
            await getAvailableCities(query);

          if (!res?.cities) {
            createNotification("Не удалось получить города", "error");
            return;
          }

          setAvailableCities(formatCities(res.cities));
        },
      });
    },
    [createNotification, enabled, formatCities],
  );

  useDebounce(
    () => {
      if (!enabled) {
        return;
      }
      void fetchCities(searchQuery);
    },
    400,
    [searchQuery, fetchCities, enabled],
  );

  return {
    availableCities,
    setSearchQuery,
    searchQuery,
    loading,
  };
};
