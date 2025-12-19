import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createOrderForCompanySkeleton,
  createOrderSkeleton,
  ICreateOrderBase,
  ICreateOrderForCompany,
  INewOrderInfo,
  IOrderReceiver,
  OrderType,
} from "~/src/entities/order/model";
import { newOrderSkeleton } from "~/src/entities/order/model";

interface InitialStateI {
  type: OrderType;
  orderInfo: INewOrderInfo;
  createOrder: ICreateOrderBase;
  createOrderForCompanyData: ICreateOrderForCompany;
  itemsToOrderIds: number[];
  [key: string]: any;
}

const initialState: InitialStateI = {
  type: "person",
  orderInfo: newOrderSkeleton,
  itemsToOrderIds: [],
  createOrder: createOrderSkeleton,
  createOrderForCompanyData: createOrderForCompanySkeleton,
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
    setOrderInfo: (
      state: InitialStateI,
      action: PayloadAction<INewOrderInfo>,
    ) => {
      state.orderInfo = action.payload;
    },
    setOrderReceiverData: (
      state,
      action: PayloadAction<Partial<IOrderReceiver>>,
    ) => {
      state.createOrderForCompany.receiver = action.payload;
    },
  },
});

export const { setOrderType, setOrder, setOrderInfo, setOrderReceiverData } =
  orderSlice.actions;
export const selectOrder = (state: { order: InitialStateI }) => state.order;
export default orderSlice.reducer;
