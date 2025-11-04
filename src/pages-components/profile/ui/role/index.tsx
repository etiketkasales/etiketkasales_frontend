"use client";
import React, { useState } from "react";
import { useProfileSections } from "~/src/entities/profile-section/lib/hooks";

import classes from "./role-page.module.scss";
import PageWrapper from "~/src/entities/page-wrapper/ui";
import ProfileSection from "~/src/entities/profile-section/ui";
import HeaderWithBack from "~/src/entities/header-with-back/ui";
import { UserRoleType } from "~/src/features/user/model";
import {
  ProfileActionType,
  profileTitlesMap,
} from "~/src/entities/profile-section/model";

interface Props {
  userRole: UserRoleType;
}

export default function ProfileRolePage({ userRole }: Props) {
  const { activeSection, onItemClick, exitSection } = useProfileSections({
    defaultSection: userRole === "buyer" ? "personal" : "profile",
  });
  const [modalType, setModalType] = useState<ProfileActionType | null>(null);

  return (
    <PageWrapper
      CustomHeader={
        <HeaderWithBack
          classNameBackButton={
            activeSection ? classes.active : classes.disabled
          }
          customMediaWidth={1024}
          className={classes.container}
          onBackClick={exitSection}
        >
          <h1 className="heading h2 text-neutral-900 text-center">
            {activeSection ? profileTitlesMap[activeSection] : "Профиль"}
          </h1>
        </HeaderWithBack>
      }
    >
      <ProfileSection
        userRole={userRole}
        activeSection={activeSection}
        onItemClick={onItemClick}
        setModalActive={(t) => setModalType(t)}
      />
    </PageWrapper>
  );
}
