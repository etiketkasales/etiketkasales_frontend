"use client";
import { configureStore } from "@reduxjs/toolkit";
import navigationSlice from "../store/reducers/navigation.slice";
import categoriesSlice from "./reducers/categories.slice";
import catalogueSlice from "./reducers/catalogue.slice";
import logInSlice from "./reducers/login.slice";
import userSlice from "./reducers/user.slice";
import companySlice from "./reducers/company.slice";
import cartSlice from "./reducers/cart.slice";

export const store = configureStore({
  reducer: {
    navigation: navigationSlice,
    categories: categoriesSlice,
    catalogue: catalogueSlice,
    cart: cartSlice,
    login: logInSlice,
    user: userSlice,
    company: companySlice,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
