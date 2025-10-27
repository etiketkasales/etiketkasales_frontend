import { useMemo } from "react";
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
      } else if ("key" in value) {
        type = "";
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
