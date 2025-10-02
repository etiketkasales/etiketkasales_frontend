import React from "react";
import ClientInitializer from "./client-initializer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ClientInitializer />
    </>
  );
}
