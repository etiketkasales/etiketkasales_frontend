"use client";
import React from "react";

import classes from "./change-data.module.scss";
import ProfileChangeDataInput from "./input";
import ProfileChangeButton from "./confirm-button";
import { profileInputsC } from "~/src/entities/profile-section/model/profile.const";
import { IProfile } from "~/src/features/user/model/user.interface";
import { IChangeUserData } from "~/src/entities/profile-section/model/profile.interface";

interface Props {
  changeData: IChangeUserData;
  currentUserInfo: IProfile;
  handleChangeData: (v: string, field: keyof IChangeUserData) => void;
  handleButtonClick: () => Promise<void>;
}

export default function ProfileChangeData({
  changeData,
  currentUserInfo,
  handleChangeData,
  handleButtonClick,
}: Props) {
  return (
    <>
      <ul className={`template-columns-12 gap-3 ${classes.container}`}>
        {profileInputsC.map((item, index) => {
          return (
            <li key={index} className={classes.item}>
              <ProfileChangeDataInput
                {...item}
                currentUserInfo={currentUserInfo}
                handleChangeData={handleChangeData}
                changeUserData={changeData}
              />
            </li>
          );
        })}
      </ul>
      <ProfileChangeButton buttonClick={handleButtonClick} />
    </>
  );
}
