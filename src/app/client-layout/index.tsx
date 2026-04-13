import ClientLayout from "~/src/entities/client-layout/ui";
import { StoreProvider } from "~/src/app/store/store-provider";
import { PublicPathRecorder } from "~/src/app/public-path-recorder";
import { ProfileRefetchOnLeaveAdmin } from "~/src/app/profile-refetch-on-leave-admin";
import React from "react";

export default function ClientRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <PublicPathRecorder />
      <ProfileRefetchOnLeaveAdmin />
      <ClientLayout>{children}</ClientLayout>
    </StoreProvider>
  );
}
