"use client";
import React from "react";

import classes from "./profile.module.scss";
import ProfileAside from "./aside";
import ProfileContent from "./content";
import { UserRoleType } from "~/src/features/user/model";
import { ProfileActionType } from "~/src/entities/profile-section/model";

interface Props {
  userRole: UserRoleType;
  activeSection: ProfileActionType | null;
  onItemClick: (s: string) => void;
  setModalActive: (type: ProfileActionType) => void;
}

export default function ProfileSection({
  userRole,
  activeSection,
  onItemClick,
  setModalActive,
}: Props) {
  return (
    <div className={`flex-row ${classes.container}`}>
      <ProfileAside
        userRole={userRole}
        activeSection={activeSection}
        onItemClick={onItemClick}
        setModalActive={setModalActive}
      />
      <ProfileContent activeSection={activeSection} />
    </div>
  );
}
