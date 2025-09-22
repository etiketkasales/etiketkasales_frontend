import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CatalogueAllFiltersI } from "~/src/entities/catalogue-section/model/catalogue.interface";

interface InitialStateI {
  allFilters: CatalogueAllFiltersI;
  [key: string]: any;
}

const initialState: InitialStateI = {
  allFilters: {},
};

export const catalogueSlice = createSlice({
  name: "catalogue",
  initialState,
  reducers: {
    setCatalogue: (
      state: InitialStateI,
      action: PayloadAction<Partial<InitialStateI>>,
    ) => {
      try {
        let key: keyof InitialStateI;
        const valueArg = action.payload;
        for (key in valueArg) {
          if (
            Object.hasOwnProperty.call(state, key) &&
            Object.hasOwnProperty.call(valueArg, key)
          ) {
            state[key] = valueArg[key];
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
});

export const { setCatalogue } = catalogueSlice.actions;
export const selectCatalogue = (state: { catalogue: InitialStateI }) =>
  state.catalogue;
export default catalogueSlice.reducer;
