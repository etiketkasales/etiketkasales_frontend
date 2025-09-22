import type { Metadata, Viewport } from "next";
import "./styles/reset.scss";
import "./styles/fonts.scss";
import "./styles/global.scss";
import "./styles/samples.scss";

import ClientRootLayout from "./client-layout";

export const metadata: Metadata = {
  title: "Этикетка",
  description: "Маркетплейс самых разных товаров",
  icons: ["/logo.png"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`flex-column space-between gap-5 page-wrapper relative`}>
        <ClientRootLayout>{children}</ClientRootLayout>
      </body>
    </html>
  );
}
