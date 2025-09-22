"use client";
import React from "react";

import classes from "./tabs.module.scss";
import ProfileWrapper from "../../wrapper";
import Button from "~/src/shared/ui/button";
import { ProfileTabsT } from "~/src/entities/profile-section/model/profile.interface";
import { profileTabsC } from "~/src/entities/profile-section/model/profile.const";

interface Props {
  currentTab: ProfileTabsT;
  setCurrentTab: React.Dispatch<React.SetStateAction<ProfileTabsT>>;
}

export default function ProfileTabs({ currentTab, setCurrentTab }: Props) {
  return (
    <ProfileWrapper
      padding="16"
      className={`flex-column gap-2 ${classes.container}`}
    >
      {profileTabsC.map((item, index) => {
        const isActive = currentTab === item.action;
        return (
          <Button
            typeButton="ghost"
            size="12"
            key={index}
            onClick={() => setCurrentTab(item.action)}
            className={`${isActive ? classes.active : ""}`}
            radius={12}
            justifyCenter={false}
          >
            <span className="gray-2 text-16 semibold second-family text-left max-content">
              {item.title}
            </span>
          </Button>
        );
      })}
    </ProfileWrapper>
  );
}
