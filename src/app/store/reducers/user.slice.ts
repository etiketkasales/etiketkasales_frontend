import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IChangeableProfile,
  IProfile,
  UserRoleType,
} from "~/src/features/user/model";
import { SProfile } from "~/src/features/user/model";

interface InitialStateI {
  userInfo: IProfile;
  changeableUserInfo: IChangeableProfile | null;
  currentRole: UserRoleType;
  isLoggedIn: boolean;
  needRemember: boolean;
  [key: string]: any;
}

const initialState: InitialStateI = {
  userInfo: SProfile,
  currentRole: "buyer",
  changeableUserInfo: null,
  userId: 0,
  needRemember: true,
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
    setNeedRemember: (state, action: PayloadAction<boolean>) => {
      state.needRemember = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("needRemember", String(action.payload));
      }
    },
  },
});

export const { setUser, setNeedRemember } = userSlice.actions;
export const selectUser = (state: { user: InitialStateI }) => state.user;
export default userSlice.reducer;
