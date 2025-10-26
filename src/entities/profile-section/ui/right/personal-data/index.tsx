"use client";
import React from "react";

import ProfilePersonalInfo from "./info";
import ProfileChangeData from "./change-data";
import { IProfile } from "~/src/features/user/model/user.interface";
import { IChangeUserData } from "~/src/entities/profile-section/model/profile.interface";

interface Props {
  userInfo: IProfile;
  changeData: IChangeUserData;
  handleChangeData: (v: string, field: keyof IChangeUserData) => void;
  handleButtonClick: () => Promise<void>;
}

export default function ProfilePersonalData({
  changeData,
  userInfo,
  handleChangeData,
  handleButtonClick,
}: Props) {
  return (
    <div className={`flex-column gap-8`}>
      <h1 className="text-28 black second-family bold">Личные данные</h1>
      <ProfilePersonalInfo
        id={userInfo.id}
        name={userInfo.name}
        second_name={userInfo.surname}
        registration_date={userInfo.created_at}
        avatar={userInfo.avatar}
      />
      <ProfileChangeData
        changeData={changeData}
        currentUserInfo={userInfo}
        handleChangeData={handleChangeData}
        handleButtonClick={handleButtonClick}
      />
    </div>
  );
}
