import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "~/src/app/store/hooks";
import { useCreateNotification } from "~/src/widgets/notifications/lib/hooks";

import { promiseWrapper } from "~/src/shared/lib";
import { getAvailableCities } from "../api";

import { IAvailableCity } from "../../model";
import { IFormModalSelectOption } from "~/src/entities/form-modal/model";

export const useGetAvailableCities = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [availableCities, setAvailableCities] = useState<
    IFormModalSelectOption[]
  >([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const createNotification = useCreateNotification();

  const formatCities = useCallback((cities: IAvailableCity[]) => {
    return cities.map((city) => {
      return {
        value: city.slug,
        label: city.name,
      };
    });
  }, []);

  const getCities = useCallback(async () => {
    await promiseWrapper({
      setLoading,
      callback: async () => {
        if (searchQuery.length < 3) return;
        const res: { cities: IAvailableCity[] } =
          await getAvailableCities(searchQuery);

        if (!res.cities) {
          createNotification("Не удалось получить города", "error");
          return;
        }

        const formattedCities = formatCities(res.cities);
        setAvailableCities(formattedCities);
      },
    });
  }, [dispatch, searchQuery, formatCities]);

  useEffect(() => {
    getCities();
  }, [getCities]);

  return {
    availableCities,
    setSearchQuery,
    searchQuery,
    loading,
  };
};
