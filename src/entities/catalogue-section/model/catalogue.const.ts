import { CatalogueFilterI } from "./catalogue.interface";

const all: CatalogueFilterI = {
  title: "Все",
  action: "all",
};

export const catalogueTypes: CatalogueFilterI[] = [all];

export const catalogueFilters = [...catalogueTypes];
