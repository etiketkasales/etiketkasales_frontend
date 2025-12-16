import React from "react";
import ClientInitializer from "./client-initializer";
import NotificationsWidget from "~/src/widgets/notifications/ui";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ClientInitializer />
      <NotificationsWidget />
    </>
  );
}
