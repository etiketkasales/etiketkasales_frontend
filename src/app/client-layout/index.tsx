import React from "react";

import ClientLayout from "~/src/entities/client-layout/ui";
import { StoreProvider } from "~/src/app/store/store-provider";

export default function ClientRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <ClientLayout>{children}</ClientLayout>
    </StoreProvider>
  );
}
