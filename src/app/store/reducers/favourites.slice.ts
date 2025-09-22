import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EtiketkaI } from "~/src/entities/etiketka/model/etiketka.interface";
import { etiketkaSkeleton } from "~/src/entities/etiketka/model/etiketka.skeleton";

interface InitialStateI {
  favouriteItems: EtiketkaI[];
  currentItem?: EtiketkaI;
  userId: number;
  loading: boolean;
  [key: string]: any;
}

const initialState: InitialStateI = {
  favouriteItems: [],
  userId: 0,
  loading: false,
  currentItem: etiketkaSkeleton,
};

const loadItemsFromLocalStorage = (userId: number): EtiketkaI[] => {
  if (typeof window !== "undefined") {
    const favourites = localStorage.getItem(`favourites_${userId}`);
    if (favourites) {
      return JSON.parse(favourites);
    }
  }
  return [];
};

const getStorageKey = (userId: number) => `favourites_${userId}`;

export const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    initializeFavourites: (state, action: PayloadAction<number>) => {
      try {
        state.loading = true;
        state.userId = action.payload;
        state.favouriteItems = loadItemsFromLocalStorage(action.payload);
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        state.loading = false;
      }
    },
    setFavourites: (state, action: PayloadAction<Partial<InitialStateI>>) => {
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
    addFavEtiketka: (state, action: PayloadAction<EtiketkaI>) => {
      try {
        if (!state.userId) return;
        state.loading = true;
        const item = state.favouriteItems.find(
          (i) => i.id === action.payload.id,
        );
        if (!item) {
          state.favouriteItems.push(action.payload);
        }
        localStorage.setItem(
          getStorageKey(state.userId),
          JSON.stringify(state.favouriteItems),
        );
      } catch (err) {
        console.error(err);
        throw err;
      } finally {
        state.loading = false;
      }
    },
    removeFavEtiketka: (state, action: PayloadAction<number>) => {
      try {
        state.loading = true;
        state.favouriteItems = state.favouriteItems.filter(
          (item) => item.id !== action.payload,
        );
        localStorage.setItem(
          getStorageKey(state.userId),
          JSON.stringify(state.favouriteItems),
        );
      } catch (err) {
        console.error(err);
        throw err;
      } finally {
        state.loading = false;
      }
    },
    clearFavourites: (state) => {
      try {
        state.loading = true;
        state.favouriteItems = [];
        localStorage.setItem(
          getStorageKey(state.userId),
          JSON.stringify(state.favouriteItems),
        );
      } finally {
        state.loading = false;
      }
    },
  },
});

export const {
  addFavEtiketka,
  removeFavEtiketka,
  clearFavourites,
  initializeFavourites,
  setFavourites,
} = favouritesSlice.actions;
export const selectFavourites = (state: { favourites: InitialStateI }) =>
  state.favourites;
export default favouritesSlice.reducer;
