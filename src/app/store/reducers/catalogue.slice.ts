import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFilters } from "~/src/features/filters/model";

interface IActiveFilter {
  title: string;
  filterName: string;
  filters: string[];
}

interface InitialStateI {
  catalogueFilters: IFilters;
  activeFilters: IActiveFilter[];
  activeCategories: string[];
  [key: string]: any;
}

const initialState: InitialStateI = {
  catalogueFilters: {},
  activeFilters: [],
  activeCategories: [],
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
    },
    setCatalogueActiveFilters: (
      state: InitialStateI,
      action: PayloadAction<IActiveFilter[]>,
    ) => {
      state.activeFilters = action.payload;
    },
    setCatalogue: (
      state: InitialStateI,
      action: PayloadAction<Partial<InitialStateI>>,
    ) => {
      try {
        let key: keyof InitialStateI;
        const valueArg = action.payload;
        for (key in valueArg) {
          if (
            Object.hasOwnProperty.call(valueArg, key) &&
            Object.hasOwnProperty.call(state, key)
          ) {
            state[key] = valueArg[key];
          }
        }
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
    setCatalogueActiveCategories: (
      state: InitialStateI,
      action: PayloadAction<string | null>,
    ) => {
      if (action.payload === null) {
        state.activeCategories = [];
        return;
      }
      if (state.activeCategories.includes(action.payload)) {
        state.activeCategories =
          state.activeCategories.filter(
            (category) => category !== action.payload,
          ) || [];
      } else {
        state.activeCategories.push(action.payload);
      }
    },
  },
});

export const {
  setCatalogueFilters,
  setCatalogueActiveCategories,
  setCatalogueActiveFilters,
  setCatalogue,
} = catalogueSlice.actions;
export const selectCatalogue = (state: { catalogue: InitialStateI }) =>
  state.catalogue;
export default catalogueSlice.reducer;
