import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoryItemInterface } from "~/src/shared/ui/categories-swiper/model/categories.interface";

interface InitialStateI {
  currentFilter: string[];
  currentFiltersNames: string[];
  categories: CategoryItemInterface[];
}

const initialState: InitialStateI = {
  currentFilter: ["all"],
  currentFiltersNames: ["Все"],
  categories: [],
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<CategoryItemInterface[]>) => {
      state.categories = action.payload;
    },
    addFilter: (state, action: PayloadAction<CategoryItemInterface>) => {
      const actionValue = action.payload;

      if (actionValue.url === "all") {
        state.currentFilter = ["all"];
        state.currentFiltersNames = ["Все"];
        return;
      }

      if (state.currentFilter.includes("all")) {
        state.currentFilter = [];
        state.currentFiltersNames = [];
      }

      if (state.currentFilter.includes(actionValue.url)) {
        state.currentFilter = state.currentFilter.filter(
          (item) => item !== actionValue.url,
        );
        state.currentFiltersNames = state.currentFiltersNames.filter(
          (item) => item !== actionValue.name,
        );
        if (state.currentFilter.length === 0) {
          state.currentFilter = ["all"];
          state.currentFiltersNames = ["Все"];
        }
        return;
      }
      state.currentFilter.push(actionValue.url);
    },
    clearFilters: (state) => {
      state.currentFilter = [];
    },
  },
});

export const { addFilter, setCategories, clearFilters } =
  categoriesSlice.actions;
export const selectCategories = (state: { categories: InitialStateI }) =>
  state.categories;
export default categoriesSlice.reducer;
