"use client";
import React from "react";

import classes from "./aside.module.scss";
import ProfileAsideItems from "./items";
import ProfileSwitchRole from "./switch-role";
import { UserRoleType } from "~/src/features/user/model";
import { ProfileActionType } from "~/src/entities/profile-section/model";

interface Props {
  userRole: UserRoleType;
  activeSection: string | null;
  onItemClick: (section: string) => void;
  setModalActive: (type: ProfileActionType) => void;
}

export default function ProfileAside({
  userRole,
  activeSection,
  onItemClick,
  setModalActive,
}: Props) {
  return (
    <div className={`${classes.container} flex-column`}>
      <ProfileAsideItems
        userRole={userRole}
        activeSection={activeSection}
        onItemClick={onItemClick}
        setModalActive={setModalActive}
      />
      <ProfileSwitchRole userRole={userRole} />
    </div>
  );
}
