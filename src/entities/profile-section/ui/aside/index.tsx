"use client";
import classes from "./aside.module.scss";
import ProfileAsideItems from "./items";
import ProfileSwitchRole from "./switch-role";
import { IProfile, UserRoleType } from "~/src/features/user/model";
import { ProfileActionType } from "~/src/entities/profile-section/model";
import React from "react";

interface Props {
  userRole: UserRoleType | "seller-pending";
  userInfo: IProfile;
  activeSection: string | null;
  onItemClick: (section: string) => void;
  setModalActive: (type: ProfileActionType) => void;
}

export default function ProfileAside({
  userRole,
  userInfo,
  activeSection,
  onItemClick,
  setModalActive,
}: Props) {
  return (
    <div
      className={`${classes.container} flex-column`}
      style={
        {
          "--display": activeSection ? "none" : "flex",
        } as React.CSSProperties
      }
    >
      <ProfileAsideItems
        userRole={userRole}
        userInfo={userInfo}
        activeSection={activeSection}
        onItemClick={onItemClick}
        setModalActive={setModalActive}
      />
      <ProfileSwitchRole userRole={userRole} />
    </div>
  );
}
