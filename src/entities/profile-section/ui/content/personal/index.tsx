"use client";
import React from "react";
import { useChangePersonal } from "~/src/entities/profile-section/lib/hooks";

import classes from "./personal.module.scss";
import ProfileUserPreview from "./preview";
import ProfileContentContainer from "../container";
import ProfileChange from "./change";
import { profileTitlesMap } from "~/src/entities/profile-section/model";
import { IProfile } from "~/src/features/user/model";

interface Props {
  userInfo: IProfile;
}

export default function ProfilePersonal({ userInfo }: Props) {
  const {
    changeableUserInfo,
    onInputChange,
    onSave,
    loading,
    disabledButton,
    enabledInputs,
    setEnabledInputs,
    onKeyDown,
    error,
  } = useChangePersonal({ userInfo });

  return (
    <ProfileContentContainer
      className={`${classes.container} flex-column`}
      title={profileTitlesMap.personal}
      loading={loading}
    >
      <ProfileUserPreview
        avatar={userInfo?.avatar}
        name={userInfo?.name}
        surname={userInfo?.surname}
        created_at={userInfo?.created_at}
      />
      <ProfileChange
        changeableProfileData={changeableUserInfo}
        phone={userInfo.phone}
        onSave={onSave}
        isDisabled={disabledButton || loading}
        onInputChange={onInputChange}
        enabledInputs={enabledInputs}
        enableInput={(f) =>
          setEnabledInputs((prev) => [...new Set([...prev, f])])
        }
        onKeyDown={onKeyDown}
        error={error}
      />
    </ProfileContentContainer>
  );
}
