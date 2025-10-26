"use client";
import React from "react";
import ProfilePersonalData from "../personal-data";
import ProfileAsLegal from "../as-legal";
import ProfileOrders from "../orders";
import {
  IChangeUserData,
  ProfileTabsT,
} from "~/src/entities/profile-section/model/profile.interface";
import { IProfile } from "~/src/features/user/model/user.interface";

interface Props {
  currentTab: ProfileTabsT;
  userInfo: IProfile;
  changeData: IChangeUserData;
  handleChangeData: (...args: any) => void;
  handleButtonClick: () => Promise<void>;
}

export default function ProfileContentRendering({
  currentTab,
  userInfo,
  changeData,
  handleChangeData,
  handleButtonClick,
}: Props) {
  switch (currentTab) {
    default:
    case "personal":
      return (
        <ProfilePersonalData
          userInfo={userInfo}
          changeData={changeData}
          handleChangeData={handleChangeData}
          handleButtonClick={handleButtonClick}
        />
      );
    case "as-legal-entity":
      return <ProfileAsLegal />;
    case "purchases":
      return <ProfileOrders />;
  }
}
