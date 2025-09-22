"use client";
import React, { useEffect } from "react";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectUser } from "~/src/app/store/reducers/user.slice";

import PageWrapper from "~/src/entities/page-wrapper/ui";
import ProfileSection from "~/src/entities/profile-section/ui";
import { useGetUser } from "~/src/features/user/lib/hooks/useGetUser.hook";

export default function ProfilePage() {
  const { userId } = useAppSelector(selectUser);
  const { handleGetUser } = useGetUser();

  useEffect(() => {
    if (!userId) return;
    handleGetUser(userId);
  }, [userId, handleGetUser]);

  return (
    <PageWrapper>
      <ProfileSection />
    </PageWrapper>
  );
}
