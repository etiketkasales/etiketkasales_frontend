// from API
export interface IFiltersBase {
  title: string;
  order: number;
}

export interface IFiltersItemDefault extends IFiltersBase {
  filters: string[];
}

export interface IFiltersDelivery extends IFiltersBase {
  filters: IFIltersDeliveryInput[];
}

export interface IFiltersRange extends IFiltersBase {
  type: string;
  min: number;
  max: number;
}

//delivery
export interface IFIltersDeliveryInput {
  id: number;
  name: string;
  cost: number;
  delivery_time: string;
}

export type IFiltersItem =
  | IFiltersItemDefault
  | IFiltersRange
  | IFiltersDelivery;

export interface IFilters {
  [key: string]: IFiltersItem;
}

//for client only
export interface ICheckboxBase extends IFiltersBase {
  filterName: string;
}

export interface IDeliveryCheckbox extends ICheckboxBase {
  filters: IFIltersDeliveryInput[];
}

export interface IDefaultCheckbox extends ICheckboxBase {
  filters: string[];
}

export interface IFiltersItemHookProps {
  filterName: string;
}

export type FilterType = "default" | "range" | "delivery" | "";

export interface IParsedFilter<T extends IFiltersItem = IFiltersItem> {
  name: string;
  type: FilterType;
  data: T;
}

export type RangeInputType = "max" | "min";
