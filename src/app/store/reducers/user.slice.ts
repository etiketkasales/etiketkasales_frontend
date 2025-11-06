import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IChangeableProfile,
  IProfile,
  SChangeableProfile,
  UserRoleType,
  SProfile,
  IUserAddress,
} from "~/src/features/user/model";

interface InitialStateI {
  userInfo: IProfile;
  changeableUserInfo: IChangeableProfile;
  currentRole: UserRoleType;
  isLoggedIn: boolean;
  needRemember: boolean;
  loadingData: boolean;
  addresses: IUserAddress[];
  [key: string]: any;
}

const initialState: InitialStateI = {
  userInfo: SProfile,
  currentRole: "buyer",
  changeableUserInfo: SChangeableProfile,
  userId: 0,
  needRemember: true,
  loadingData: false,
  isLoggedIn: true,
  addresses: [],
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
