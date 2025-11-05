import React from "react";

import ProfilePersonal from "./personal";
import ProfileContentContainer from "./container";
import LoaderCircle from "~/src/shared/ui/loader-circle";
import { ProfileActionType } from "~/src/entities/profile-section/model/profile.interface";
import { IProfile } from "~/src/features/user/model";

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
      <ProfileContentContainer className="relative">
        <LoaderCircle radius={20} />
      </ProfileContentContainer>
    );
  }
  switch (activeSection) {
    default:
      return null;
    case "personal":
      return <ProfilePersonal userInfo={userInfo} />;
  }
}
