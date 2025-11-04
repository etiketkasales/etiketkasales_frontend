"use client";
import React from "react";

import classes from "./aside.module.scss";
import ProfileAsideItems from "./items";
import ProfileSwitchRole from "./switch-role";
import { UserRoleType } from "~/src/features/user/model/user.interface";

interface Props {
  userRole: UserRoleType;
  activeSection: string | null;
  onItemClick: (section: string) => void;
}

export default function ProfileAside({
  userRole,
  activeSection,
  onItemClick,
}: Props) {
  return (
    <div className={`${classes.container} flex-column`}>
      <ProfileAsideItems
        userRole={userRole}
        activeSection={activeSection}
        onItemClick={onItemClick}
      />
      <ProfileSwitchRole userRole={userRole} />
    </div>
  );
}
