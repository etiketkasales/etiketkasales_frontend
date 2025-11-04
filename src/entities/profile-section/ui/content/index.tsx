import React from "react";

import ProfilePersonal from "./personal";
import { ProfileActionType } from "~/src/entities/profile-section/model/profile.interface";

interface Props {
  activeSection: ProfileActionType | null;
}

export default function ProfileContent({ activeSection }: Props) {
  switch (activeSection) {
    default:
      return null;
    case "personal":
      return <ProfilePersonal />;
  }
}
