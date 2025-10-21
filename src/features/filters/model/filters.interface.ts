// from API
export interface IFiltersBase {
  title: string;
}

export interface IFiltersItemDefault extends IFiltersBase {
  filters: string[];
}

export interface IFiltersRange extends IFiltersBase {
  type: string;
  min: number;
  max: number;
}

export interface IFIltersDeliveryInput {
  id: number;
  name: string;
  cost: number;
  delivery_time: string;
}

export interface IFiltersDelivery extends IFiltersBase {
  filters: IFIltersDeliveryInput[];
}

export type IFiltersItem =
  | IFiltersItemDefault
  | IFiltersRange
  | IFiltersDelivery;

export interface IFilters {
  [key: string]: IFiltersItem;
}

//for client only
export interface IFiltersItemHookProps {
  filterName: string;
}

export type FilterType = "default" | "range" | "delivery";

export interface ParsedFilter<T extends IFiltersItem = IFiltersItem> {
  name: string;
  type: FilterType;
  data: T;
}
