import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IDeliveryMethodResponse,
  IItemToOrder,
  IOrderPickupPointData,
  IOrderReceiver,
  orderDeliveryMethodSkeleton,
  orderPickupPointSkeleton,
  orderReceiverSkeleton,
  OrderType,
} from "~/src/entities/order/model";

interface InitialStateI {
  type: OrderType;
  deliveryMethod: IDeliveryMethodResponse;
  deliveryAddressId: string | number;
  receiver: IOrderReceiver;
  receiverCompanyId: number;
  pickupPoint: IOrderPickupPointData;
  itemsToOrder: IItemToOrder[];
  buttonDisabled: boolean;
  paymentMethod: string | null;
  [key: string]: any;
}

const initialState: InitialStateI = {
  type: "person",
  itemsToOrder: [],
  deliveryAddressId: 0,
  deliveryMethod: orderDeliveryMethodSkeleton,
  receiverCompanyId: 0,
  pickupPoint: orderPickupPointSkeleton,
  receiver: orderReceiverSkeleton,
  buttonDisabled: false,
  paymentMethod: null,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderInfo: (state, action: PayloadAction<Partial<InitialStateI>>) => {
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
    },
    setOrderItems: (state, action: PayloadAction<IItemToOrder[]>) => {
      state.itemsToOrder = action.payload;
    },
    setOrderReceiverData: (state, action: PayloadAction<IOrderReceiver>) => {
      state.receiver = action.payload;
    },
    setOrderDeliveryMethod: (
      state,
      action: PayloadAction<IDeliveryMethodResponse>,
    ) => {
      state.deliveryMethod = action.payload;
    },
    setOrderPickupPoint: (
      state,
      action: PayloadAction<IOrderPickupPointData>,
    ) => {
      state.pickupPoint = action.payload;
    },
  },
});

export const {
  setOrderReceiverData,
  setOrderDeliveryMethod,
  setOrderItems,
  setOrderPickupPoint,
  setOrderInfo,
} = orderSlice.actions;
export const selectOrder = (state: { order: InitialStateI }) => state.order;
export default orderSlice.reducer;
