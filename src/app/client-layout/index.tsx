"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ClientLayout from "~/src/entities/client-layout/ui";
import { StoreProvider } from "~/src/app/store/store-provider";
import { PublicPathRecorder } from "~/src/app/public-path-recorder";
import { ProfileRefetchOnLeaveAdmin } from "~/src/app/profile-refetch-on-leave-admin";
import { AuthRefreshListener } from "~/src/shared/lib/api/authRefreshListener";

export default function ClientRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60_000,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            refetchOnMount: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <PublicPathRecorder />
        <AuthRefreshListener />
        <ProfileRefetchOnLeaveAdmin />
        <ClientLayout>{children}</ClientLayout>
      </StoreProvider>
    </QueryClientProvider>
  );
}
