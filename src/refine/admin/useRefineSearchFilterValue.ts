import { useMemo } from "react";
import type { CrudFilters } from "@refinedev/core";

export function getSearchFilterValue(filters: CrudFilters): string {
  const item = filters.find((f) => "field" in f && f.field === "search");
  return item && "value" in item ? String(item.value ?? "") : "";
}

export function useRefineSearchFilterValue(filters: CrudFilters): string {
  return useMemo(() => getSearchFilterValue(filters), [filters]);
}
