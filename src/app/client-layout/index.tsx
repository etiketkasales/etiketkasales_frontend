"use client";

import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import ClientLayout from "~/src/entities/client-layout/ui";
import { StoreProvider } from "~/src/app/store/store-provider";
import { PublicPathRecorder } from "~/src/app/public-path-recorder";
import { ProfileRefetchOnLeaveAdmin } from "~/src/app/profile-refetch-on-leave-admin";
import { AuthBootstrap } from "~/src/shared/lib/api/AuthBootstrap";
import { AuthRefreshListener } from "~/src/shared/lib/api/authRefreshListener";
import { getQueryClient } from "~/src/shared/lib/queryClient";

const queryClient = getQueryClient();

export default function ClientRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthBootstrap>
        <StoreProvider>
          <PublicPathRecorder />
          <AuthRefreshListener />
          <ProfileRefetchOnLeaveAdmin />
          <ClientLayout>{children}</ClientLayout>
        </StoreProvider>
      </AuthBootstrap>
    </QueryClientProvider>
  );
}
