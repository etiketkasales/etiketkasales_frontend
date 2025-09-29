import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfoI } from "~/src/features/user/model/user.interface";
import { userInfoS } from "~/src/features/user/model/user.skeleton";

interface InitialStateI {
  userInfo: UserInfoI;
  currentRole: "user" | "customer";
  userId: number;
  isLoggedIn: boolean;
  [key: string]: any;
}

const initialState: InitialStateI = {
  userInfo: userInfoS,
  currentRole: "user",
  userId: 0,
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state: InitialStateI,
      action: PayloadAction<Partial<InitialStateI>>,
    ) => {
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

export const { setUser } = userSlice.actions;
export const selectUser = (state: { user: InitialStateI }) => state.user;
export default userSlice.reducer;
