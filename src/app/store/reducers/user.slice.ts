import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IChangeableProfile,
  IProfile,
  SChangeableProfile,
  UserRoleType,
  SProfile,
  IUserAddress,
  IUserCompany,
} from "~/src/features/user/model";

interface InitialStateI {
  userInfo: IProfile;
  changeableUserInfo: IChangeableProfile;
  currentRole: UserRoleType;
  isLoggedIn: boolean;
  needRemember: boolean;
  loadingData: boolean;
  addresses: IUserAddress[];
  companies: IUserCompany[];
  loggedOutFromProfile: boolean;
  buyerAsSeller: boolean;
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
  loggedOutFromProfile: false,
  addresses: [],
  companies: [],
  buyerAsSeller: false,
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
    setProfileAvatar: (
      state: InitialStateI,
      action: PayloadAction<{
        avatar: string;
      }>,
    ) => {
      state.changeableUserInfo.avatar = action.payload.avatar;
    },
    clearUserData: (state: InitialStateI) => {
      state.addresses = [];
      state.changeableUserInfo = SChangeableProfile;
      state.userInfo = SProfile;
      state.companies = [];
      state.isLoggedIn = false;
    },
    setNeedRemember: (state, action: PayloadAction<boolean>) => {
      state.needRemember = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("needRemember", String(action.payload));
      }
    },
  },
});

export const { setUser, setNeedRemember, clearUserData, setProfileAvatar } =
  userSlice.actions;
export const selectUser = (state: { user: InitialStateI }) => state.user;
export default userSlice.reducer;
