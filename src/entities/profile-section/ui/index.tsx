"use client";
import React, { useState } from "react";
import { useProfile } from "../lib/hooks/useProfile.hook";

import classes from "./profile-section.module.scss";
import ProfileLeft from "./left";
import ProfileRightSection from "./right";
import { ProfileTabsT } from "~/src/entities/profile-section/model/profile.interface";

export default function ProfileSection() {
  const { userInfo, changeData, handleChangeData, handleButtonClick } =
    useProfile();
  const [currentTab, setCurrentTab] = useState<ProfileTabsT>("personal");
  return (
    <div className="flex-row flex-start gap-5">
      <ProfileLeft currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <ProfileRightSection
        currentTab={currentTab}
        userInfo={userInfo}
        changeData={changeData}
        handleChangeData={handleChangeData}
        handleButtonClick={handleButtonClick}
      />
    </div>
  );
}
