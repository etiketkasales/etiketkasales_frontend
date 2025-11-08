"use client";
import React, { useState } from "react";
import { useProfileSections } from "~/src/entities/profile-section/lib/hooks";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectUser } from "~/src/app/store/reducers/user.slice";
import { redirect } from "next/navigation";

import classes from "./role-page.module.scss";
import PageWrapper from "~/src/entities/page-wrapper/ui";
import ProfileSection from "~/src/entities/profile-section/ui";
import HeaderWithBack from "~/src/entities/header-with-back/ui";
import ProfileModal from "./modal";
import { UserRoleType } from "~/src/features/user/model";
import {
  ProfileActionType,
  profileTitlesMap,
} from "~/src/entities/profile-section/model";

interface Props {
  userRole: UserRoleType;
}

export default function ProfileRolePage({ userRole }: Props) {
  const { userInfo, isLoggedIn, loadingData } = useAppSelector(selectUser);
  const { activeSection, onItemClick, exitSection, loaded } =
    useProfileSections({
      defaultSection: userRole === "buyer" ? "personal" : "profile",
    });
  const [modalType, setModalType] = useState<ProfileActionType | null>(null);

  if (!isLoggedIn) return redirect("/login");

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
          <h2 className="heading h2 text-neutral-900 text-center">
            {activeSection ? profileTitlesMap[activeSection] : "Профиль"}
          </h2>
        </HeaderWithBack>
      }
    >
      <ProfileSection
        userInfo={userInfo}
        userRole={userRole}
        activeSection={activeSection}
        onItemClick={onItemClick}
        setModalActive={(t) => setModalType(t)}
        loaded={!loadingData && loaded}
      />
      <ProfileModal modalType={modalType} onClose={() => setModalType(null)} />
    </PageWrapper>
  );
}
