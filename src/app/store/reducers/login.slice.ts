import { createSlice } from "@reduxjs/toolkit";

interface InitialStateI {
  phoneNumber: string;
}

const initialState: InitialStateI = {
  phoneNumber: "",
};

export const logInSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
  },
});

export const { setPhoneNumber } = logInSlice.actions;
export const selectLogIn = (state: { login: InitialStateI }) => state.login;
export default logInSlice.reducer;
