import React from "react";
import { useChangePersonal } from "~/src/entities/profile-section/lib/hooks";

import classes from "./company-profile.module.scss";
import ProfileContentContainer from "../container";
import CompanyProfileAvatar from "./avatar";
import CompanyRegDate from "./reg-date";
import CompanyProfileChange from "./change";
import { IProfile } from "~/src/features/user/model";
import { profileTitlesMap } from "~/src/entities/profile-section/model";

interface Props {
  userInfo: IProfile;
}

export default function CompanyProfile({ userInfo }: Props) {
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
      className={`flex-column ${classes.container}`}
      title={profileTitlesMap.profile}
      loading={loading}
    >
      <CompanyProfileAvatar initCompanyAvatar={userInfo.avatar} />
      <CompanyRegDate created_at={userInfo.created_at} />
      <CompanyProfileChange
        onSave={onSave}
        changeableProfileData={changeableUserInfo}
        enabledInputs={enabledInputs}
        onInputChange={onInputChange}
        error={error}
        disabledButton={disabledButton}
        enableInput={(f) =>
          setEnabledInputs((prev) => [...new Set([...prev, f])])
        }
        onKeyDown={onKeyDown}
        loading={loading}
      />
    </ProfileContentContainer>
  );
}
