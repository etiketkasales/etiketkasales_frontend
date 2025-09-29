"use client";
import React, { useEffect } from "react";
import { useGetUser } from "~/src/features/user/lib/hooks/useGetUser.hook";

import PageWrapper from "~/src/entities/page-wrapper/ui";
import ProfileSection from "~/src/entities/profile-section/ui";

export default function ProfilePage() {
  const { handleGetUser } = useGetUser();

  useEffect(() => {
    handleGetUser();
  }, [handleGetUser]);

  return (
    <PageWrapper>
      <ProfileSection />
    </PageWrapper>
  );
}
