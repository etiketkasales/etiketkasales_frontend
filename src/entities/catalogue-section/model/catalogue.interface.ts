export interface CatalogueFilterI {
  title: string;
  action: CatalogueFilterActionI;
  minValue?: number;
  maxValue?: number;
}

export interface CatalogueAllFiltersI {
  [title: string]: CatalogueFilterI[];
}

export type CatalogueFilterActionI =
  | "delivery"
  | "price"
  | "printing_tech"
  | "height"
  | "width"
  | "maker"
  | "app_scope" //область применения
  | "material"
  | "form"
  | "type"
  | "all";
