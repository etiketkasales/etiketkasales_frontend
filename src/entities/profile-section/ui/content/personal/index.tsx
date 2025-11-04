"use client";
import React from "react";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectUser } from "~/src/app/store/reducers/user.slice";

import classes from "./personal.module.scss";
import ProfileUserPreview from "./preview";
import ProfileContentContainer from "../container";
import { profileTitlesMap } from "~/src/entities/profile-section/model";

export default function ProfilePersonal() {
  const { userInfo } = useAppSelector(selectUser);

  return (
    <ProfileContentContainer className={`${classes.container} flex-column`}>
      <h1 className="heading h4 text-neutral-1000">
        {profileTitlesMap.personal}
      </h1>
      <ProfileUserPreview
        avatar={userInfo?.avatar}
        name={userInfo?.name}
        surname={userInfo?.surname}
        created_at={userInfo?.created_at}
      />
    </ProfileContentContainer>
  );
}
