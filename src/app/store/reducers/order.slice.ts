import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INewOrderInfo } from "~/src/entities/order/model";
import { newOrderSkeleton } from "~/src/entities/order/model";

export type OrderType = "company" | "person";

interface InitialStateI {
  type: OrderType;
  orderInfo: INewOrderInfo;
  itemsToOrderIds: number[];
  [key: string]: any;
}

const initialState: InitialStateI = {
  type: "person",
  orderInfo: newOrderSkeleton,
  itemsToOrderIds: [],
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderType: (state, action: PayloadAction<OrderType>) => {
      state.type = action.payload;
    },
    setOrder: (state, action: PayloadAction<Partial<InitialStateI>>) => {
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
      }
    },
  },
});

export const { setOrderType, setOrder } = orderSlice.actions;
export const selectOrder = (state: { order: InitialStateI }) => state.order;
export default orderSlice.reducer;
