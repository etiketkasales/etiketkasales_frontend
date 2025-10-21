import { useEffect, useMemo } from "react";
import { useAppDispatch } from "~/src/app/store/hooks";
import { setCatalogueFilters } from "~/src/app/store/reducers/catalogue.slice";
import {
  FilterType,
  IFilters,
  IFiltersItem,
  ParsedFilter,
} from "~/src/features/filters/model";

interface Props {
  filters: IFilters;
}

export const useFiltersParse = ({ filters }: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!filters) return;
    dispatch(setCatalogueFilters(filters));
  }, [filters, dispatch]);

  return useMemo(() => {
    if (!filters) return [];

    return Object.entries(filters).map(([name, value]) => {
      let type: FilterType;

      if ("filters" in value && Array.isArray(value.filters)) {
        const first = value.filters[0];
        if (typeof first === "string") {
          type = "default";
        } else if (typeof first === "object" && "cost" in first) {
          type = "delivery";
        } else {
          type = "default";
        }
      } else if ("min" in value && "max" in value) {
        type = "range";
      } else {
        type = "default";
      }
      return {
        name,
        type,
        data: value as IFiltersItem,
      } as ParsedFilter;
    });
  }, [filters]);
};
