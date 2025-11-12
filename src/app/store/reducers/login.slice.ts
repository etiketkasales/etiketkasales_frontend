import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialStateI {
  phoneNumber: string;
  forwardHref: string;
}

const initialState: InitialStateI = {
  phoneNumber: "",
  forwardHref: "/profile",
};

export const logInSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setForwardHref: (state, action: PayloadAction<string>) => {
      state.forwardHref = action.payload || "/profile";
    },
  },
});

export const { setPhoneNumber, setForwardHref } = logInSlice.actions;
export const selectLogIn = (state: { login: InitialStateI }) => state.login;
export default logInSlice.reducer;
