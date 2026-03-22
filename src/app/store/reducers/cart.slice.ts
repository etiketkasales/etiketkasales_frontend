import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ICartItem,
  ICartTotal,
} from "~/src/features/cart/model/cart.interface";
import { cartTotalSkeleton } from "~/src/features/cart/model/cart.skeleton";

interface InitialState {
  items: ICartItem[];
  isAllSelected: boolean;
  total: ICartTotal;
  itemsAmount: number;
  [key: string]: any;
}

const initialState: InitialState = {
  items: [],
  total: cartTotalSkeleton,
  isAllSelected: false,
  itemsAmount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<Partial<InitialState>>) => {
      try {
        let key: keyof InitialState;
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
        console.error(`Cannot update cart`, err);
        throw err;
      }
    },
  },
});

export const { setCart } = cartSlice.actions;
export const selectCart = (state: { cart: InitialState }) => state.cart;
export default cartSlice.reducer;
