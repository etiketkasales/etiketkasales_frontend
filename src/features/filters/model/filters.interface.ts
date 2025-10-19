export interface IFiltersItem {
  title: string;
  filters: string[];
}

export interface IFilters {
  [key: string]: IFiltersItem;
}
