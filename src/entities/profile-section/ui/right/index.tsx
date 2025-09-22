"use client";
import React from "react";

import classes from "./right.module.scss";
import ProfileWrapper from "~/src/entities/profile-section/ui/wrapper";
import ProfileContentRendering from "./content-rendering";
import {
  IChangeUserData,
  ProfileTabsT,
} from "~/src/entities/profile-section/model/profile.interface";
import { UserInfoI } from "~/src/features/user/model/user.interface";

interface Props {
  currentTab: ProfileTabsT;
  userInfo: UserInfoI;
  changeData: IChangeUserData;
  handleChangeData: (v: string, field: keyof IChangeUserData) => void;
  handleButtonClick: () => Promise<void>;
}

export default function ProfileRightSection({
  currentTab,
  userInfo,
  changeData,
  handleChangeData,
  handleButtonClick,
}: Props) {
  return (
    <ProfileWrapper padding="20-32" className={`${classes.container}`}>
      <ProfileContentRendering
        currentTab={currentTab}
        userInfo={userInfo}
        changeData={changeData}
        handleChangeData={handleChangeData}
        handleButtonClick={handleButtonClick}
      />
    </ProfileWrapper>
  );
}
