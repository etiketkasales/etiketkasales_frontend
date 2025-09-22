import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EtiketkaI } from "~/src/entities/etiketka/model/etiketka.interface";
import { cartItemSkeleton } from "~/src/features/cart/model/cart.skeleton";

interface InitialStateI {
  cartItems: EtiketkaI[];
  selectedItems: number[];
  isAllSelected: boolean;
  currentItem?: EtiketkaI;
  itemsSum: number;
  discountSum: number;
  userId: number;
  loading: boolean;
  [key: string]: any;
}

const initialState: InitialStateI = {
  cartItems: [],
  selectedItems: [],
  isAllSelected: true,
  loading: false,
  itemsSum: 0,
  discountSum: 0,
  userId: 0,
  currentItem: cartItemSkeleton,
};

const loadCartFromLocalStorage = (userId: number): EtiketkaI[] => {
  if (typeof window !== "undefined") {
    const cart = localStorage.getItem(`cart_${userId}`);
    if (cart) {
      return JSON.parse(cart);
    }
  }
  return [];
};

const getCartKey = (userId: number) => `cart_${userId}`;

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    initializeCart: (state, action: PayloadAction<number>) => {
      //передается id пользователя
      try {
        state.loading = true;
        state.userId = action.payload;
        state.cartItems = loadCartFromLocalStorage(action.payload);
        state.selectedItems = state.cartItems.map((item) => item.id);
      } catch (error) {
        console.error(error);
      } finally {
        state.loading = false;
      }
    },
    deleteSelectedItems: (state) => {
      state.cartItems = state.cartItems.filter(
        (item) => !state.selectedItems.includes(item.id),
      );
    },
    toggleSelectAll: (state) => {
      const newValue = !state.isAllSelected;
      state.isAllSelected = newValue;
      if (newValue) {
        state.selectedItems = state.cartItems.map((item) => item.id);
      } else {
        state.selectedItems = [];
      }
    },
    setCart: (
      state: InitialStateI,
      action: PayloadAction<Partial<InitialStateI>>,
    ) => {
      try {
        state.loading = true;
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
      } finally {
        state.loading = false;
      }
    },
    addEtiketka: (state, action: PayloadAction<EtiketkaI>) => {
      try {
        if (!state.userId) return;
        state.loading = true;
        const item = state.cartItems.find((i) => i.id === action.payload.id);

        if (item) {
          item.in_cart_count = (item.in_cart_count || 0) + 1;
        } else {
          const newItem = {
            ...action.payload,
            in_cart_count: 1,
          };
          state.cartItems.push(newItem);
        }
        localStorage.setItem(
          getCartKey(state.userId),
          JSON.stringify(state.cartItems),
        );
      } catch (err) {
        console.error(err);
      } finally {
        state.loading = false;
      }
    },
    removeEtiketka: (state, action: PayloadAction<number>) => {
      try {
        if (!state.userId) return;
        state.loading = true;
        const item = state.cartItems.find((i) => i.id === action.payload);
        if (item && item.in_cart_count! > 1) {
          item.in_cart_count = (item.in_cart_count || 0) - 1;
        } else {
          state.cartItems = state.cartItems.filter(
            (item) => item.id !== action.payload,
          );
        }
        localStorage.setItem(
          getCartKey(state.userId),
          JSON.stringify(state.cartItems),
        );
      } catch (err) {
        console.error(err);
      } finally {
        state.loading = false;
      }
    },
    clearCart: (state: InitialStateI) => {
      try {
        state.loading = true;
        state.cartItems = [];
        localStorage.removeItem(getCartKey(state.userId));
      } finally {
        state.loading = false;
      }
    },
  },
});

export const {
  setCart,
  addEtiketka,
  removeEtiketka,
  clearCart,
  initializeCart,
  toggleSelectAll,
  deleteSelectedItems,
} = cartSlice.actions;
export const selectCart = (state: { cart: InitialStateI }) => state.cart;
export default cartSlice.reducer;
