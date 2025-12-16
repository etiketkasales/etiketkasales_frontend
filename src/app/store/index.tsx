"use client";
import { configureStore } from "@reduxjs/toolkit";
import navigationSlice from "../store/reducers/navigation.slice";
import catalogueSlice from "./reducers/catalogue.slice";
import logInSlice from "./reducers/login.slice";
import userSlice from "./reducers/user.slice";
import companySlice from "./reducers/company.slice";
import cartSlice from "./reducers/cart.slice";
import orderSlice from "./reducers/order.slice";
import notificationsSlice from "./reducers/notifications.slice";

export const store = configureStore({
  reducer: {
    navigation: navigationSlice,
    catalogue: catalogueSlice,
    cart: cartSlice,
    login: logInSlice,
    user: userSlice,
    company: companySlice,
    order: orderSlice,
    notifications: notificationsSlice,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
