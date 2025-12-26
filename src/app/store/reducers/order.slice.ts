import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IDeliveryMethodResponse,
  IOrderPickupPointData,
  IOrderReceiver,
  IProductForDeliveryMethod,
  orderDeliveryMethodSkeleton,
  orderPickupPointSkeleton,
  orderReceiverSkeleton,
  OrderType,
} from "~/src/entities/order/model";

interface InitialStateI {
  type: OrderType;
  deliveryMethod: IDeliveryMethodResponse;
  deliveryAddressId: number;
  receiver: IOrderReceiver;
  receiverCompanyId: number;
  pickupPoint: IOrderPickupPointData;
  itemsToOrder: IProductForDeliveryMethod[];
  buttonDisabled: boolean;
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
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderType: (state, action: PayloadAction<OrderType>) => {
      state.type = action.payload;
    },
    setButtonDisabled: (state, action: PayloadAction<boolean>) => {
      state.buttonDisabled = action.payload;
    },
    setOrderItems: (
      state,
      action: PayloadAction<IProductForDeliveryMethod[]>,
    ) => {
      state.itemsToOrder = action.payload;
    },
    setOrderReceiverData: (state, action: PayloadAction<IOrderReceiver>) => {
      state.receiver = action.payload;
    },
    setOrderDeliveryAddressId: (state, action: PayloadAction<number>) => {
      state.deliveryAddressId = action.payload;
    },
    setOrderDeliveryMethod: (
      state,
      action: PayloadAction<IDeliveryMethodResponse>,
    ) => {
      state.deliveryMethod = action.payload;
    },
    setOrderCompanyId: (state, action: PayloadAction<number>) => {
      state.receiverCompanyId = action.payload;
    },
  },
});

export const {
  setOrderType,
  setOrderReceiverData,
  setOrderDeliveryAddressId,
  setOrderDeliveryMethod,
  setOrderItems,
  setOrderCompanyId,
  setButtonDisabled,
} = orderSlice.actions;
export const selectOrder = (state: { order: InitialStateI }) => state.order;
export default orderSlice.reducer;
