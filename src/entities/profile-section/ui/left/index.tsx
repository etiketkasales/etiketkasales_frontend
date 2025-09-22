"use client";
import React from "react";

import classes from "./left.module.scss";
import ProfileTabs from "./tabs";
import { ProfileTabsT } from "~/src/entities/profile-section/model/profile.interface";
import ProfileSwitchRole from "./switch-role";

interface Props {
  currentTab: ProfileTabsT;
  setCurrentTab: React.Dispatch<React.SetStateAction<ProfileTabsT>>;
}

export default function ProfileLeft({ currentTab, setCurrentTab }: Props) {
  return (
    <section className={`flex-column gap-5 ${classes.container}`}>
      <ProfileTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <ProfileSwitchRole />
    </section>
  );
}
