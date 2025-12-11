"use client";
import React, { useMemo, useState } from "react";
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
  paramsRole: UserRoleType | "seller-pending";
}

export default function ProfileRolePage({ paramsRole }: Props) {
  const { userInfo, isLoggedIn, loadingData } = useAppSelector(selectUser);
  const defaultSection = useMemo(() => {
    if (paramsRole === "seller-pending") return "quote";
    return paramsRole === "seller" ? "profile" : "personal";
  }, [paramsRole]);
  const { activeSection, onItemClick, exitSection, loaded } =
    useProfileSections({
      defaultSection,
    });
  const [modalType, setModalType] = useState<ProfileActionType | null>(null);

  if (!isLoggedIn) return redirect("/login");

  // if (paramsRole !== userInfo.role) {
  //   if (paramsRole !== "seller-pending") {
  //     return redirect("/profile");
  //   }
  // }

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
        userRole={paramsRole}
        activeSection={activeSection}
        onItemClick={onItemClick}
        setModalActive={(t) => setModalType(t)}
        loaded={!loadingData && loaded}
      />
      <ProfileModal modalType={modalType} onClose={() => setModalType(null)} />
    </PageWrapper>
  );
}
