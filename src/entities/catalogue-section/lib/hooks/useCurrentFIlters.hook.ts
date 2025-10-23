import { useEffect, useState } from "react";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectCatalogue } from "~/src/app/store/reducers/catalogue.slice";

export const useCurrentFilters = () => {
  const { activeFilters, activeCategories } = useAppSelector(selectCatalogue);
  const [needClearButton, setNeedClearButton] = useState<boolean>(false);

  useEffect(() => {
    const hasCategories = activeCategories.length > 0;
    let hasFilters: boolean = false;

    activeFilters.forEach((item) => {
      const hasLocalFilters = item.filters.length > 0;
      if (hasLocalFilters) {
        hasFilters = true;
        return;
      }
    });

    setNeedClearButton(hasCategories || hasFilters);
  }, [activeCategories.length, activeFilters]);

  return {
    activeCategories,
    activeFilters,
    needClearButton,
  };
};
