import React from "react";

import ProfilePersonal from "./personal";
import ProfileContentContainer from "./container";
import LoaderCircle from "~/src/shared/ui/loader-circle";
import { ProfileActionType } from "~/src/entities/profile-section/model/profile.interface";

interface Props {
  activeSection: ProfileActionType | null;
  loaded: boolean;
}

export default function ProfileContent({ activeSection, loaded }: Props) {
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
      return <ProfilePersonal />;
  }
}
