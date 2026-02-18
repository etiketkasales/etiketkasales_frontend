import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NavigationStateI {
  modalOpen: boolean;
  modalCloseOnOutsideClick: boolean;
  deviceType: "android" | "ios" | "default";
  headerHeight: number;
  tabsHeight: number | null;
  loaded: boolean;
  cities: string[];
  activeTabsItem: string;
  [key: string]: any;
}

const initialState: NavigationStateI = {
  modalOpen: false,
  modalCloseOnOutsideClick: true,
  deviceType: "android",
  headerHeight: 0,
  tabsHeight: null,
  loaded: false,
  activeTabsItem: "",
  cities: [],
};

export const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setNavigation: (
      state: NavigationStateI,
      action: PayloadAction<Partial<NavigationStateI>>,
    ) => {
      try {
        let key: keyof NavigationStateI;
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
      }
    },
  },
});

export const { setNavigation } = navigationSlice.actions;
export const selectNavigation = (state: { navigation: NavigationStateI }) =>
  state.navigation;
export default navigationSlice.reducer;
