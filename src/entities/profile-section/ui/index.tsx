"use client";
import React from "react";
import { useProfileSections } from "../lib/hooks/useProfileSections.hook";

import classes from "./profile.module.scss";
import ProfileAside from "./aside";
import { UserRoleType } from "~/src/features/user/model/user.interface";

interface Props {
  userRole: UserRoleType;
}

export default function ProfileSection({ userRole }: Props) {
  const { activeSection, onItemClick, exitSection } = useProfileSections({
    defaultSection: userRole === "buyer" ? "personal" : "profile",
  });
  return (
    <div className={`flex-row ${classes.container}`}>
      <ProfileAside
        userRole={userRole}
        activeSection={activeSection}
        onItemClick={onItemClick}
      />
    </div>
  );
}
