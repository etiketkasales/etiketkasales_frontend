import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialStateI {
  phoneNumber: string;
  prevHref: string;
}

const initialState: InitialStateI = {
  phoneNumber: "",
  prevHref: "/",
};

export const logInSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setPrevHref: (state, action: PayloadAction<string>) => {
      state.prevHref = action.payload || "/";
    },
  },
});

export const { setPhoneNumber, setPrevHref } = logInSlice.actions;
export const selectLogIn = (state: { login: InitialStateI }) => state.login;
export default logInSlice.reducer;
