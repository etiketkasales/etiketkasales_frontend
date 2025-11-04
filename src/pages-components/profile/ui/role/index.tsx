import React from "react";

import PageWrapper from "~/src/entities/page-wrapper/ui";
import ProfileSection from "~/src/entities/profile-section/ui";
import { UserRoleType } from "~/src/features/user/model/user.interface";

interface Props {
  userRole: UserRoleType;
}

export default function ProfileRolePage({ userRole }: Props) {
  return (
    <PageWrapper>
      <ProfileSection userRole={userRole} />
    </PageWrapper>
  );
}
