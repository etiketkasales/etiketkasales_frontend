import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFilters } from "~/src/features/filters/model";

interface InitialStateI {
  catalogueFilters: IFilters;
  catalogueFiltersKeys: string[];
}

const initialState: InitialStateI = {
  catalogueFilters: {},
  catalogueFiltersKeys: [],
};

export const catalogueSlice = createSlice({
  name: "catalogue",
  initialState,
  reducers: {
    setCatalogueFilters: (
      state: InitialStateI,
      action: PayloadAction<IFilters>,
    ) => {
      state.catalogueFilters = action.payload;
      state.catalogueFiltersKeys = Object.keys(action.payload);
    },
  },
});

export const { setCatalogueFilters } = catalogueSlice.actions;
export const selectCatalogue = (state: { catalogue: InitialStateI }) =>
  state.catalogue;
export default catalogueSlice.reducer;
