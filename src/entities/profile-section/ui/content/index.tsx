import React from "react";

import classes from "./profile-content.module.scss";
import ProfilePersonal from "./personal";
import ProfileContentContainer from "./container";
import LoaderCircle from "~/src/shared/ui/loader-circle";
import ProfileOrders from "./orders";
import ProfileCompanies from "./companies";
import ProfileInDev from "./in-dev";
import { ProfileActionType } from "~/src/entities/profile-section/model/profile.interface";
import { IProfile } from "~/src/features/user/model";
import { profileInDev } from "../../model";

interface Props {
  activeSection: ProfileActionType | null;
  loaded: boolean;
  userInfo: IProfile;
}

export default function ProfileContent({
  activeSection,
  loaded,
  userInfo,
}: Props) {
  if (!loaded) {
    return (
      <ProfileContentContainer className={`relative ${classes.loader}`}>
        <LoaderCircle radius={20} />
      </ProfileContentContainer>
    );
  }
  if (activeSection && profileInDev.includes(activeSection)) {
    return <ProfileInDev />;
  }

  switch (activeSection) {
    default:
      return null;
    case "personal":
      return <ProfilePersonal userInfo={userInfo} />;
    case "orders":
      return <ProfileOrders />;
    case "as_legal":
      return <ProfileCompanies />;
  }
}
