import React from "react";
import classNames from "classnames";
import { appFonts } from "~/src/shared/config/fonts/fonts";
export { layoutMetadata as metadata, viewport } from "~/src/shared/config";

import ClientRootLayout from "./client-layout";

import "./styles/reset.scss";
import "./styles/global.scss";
import "./styles/samples.scss";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const className = classNames(
    `flex-column space-between gap-5 page-wrapper relative`,
    appFonts,
  );

  return (
    <html lang="ru">
      <body className={className}>
        <ClientRootLayout>{children}</ClientRootLayout>
      </body>
    </html>
  );
}
