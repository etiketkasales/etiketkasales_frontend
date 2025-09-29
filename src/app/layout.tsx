import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import classNames from "classnames";

import "./styles/reset.scss";
import "./styles/global.scss";
import "./styles/samples.scss";

import ClientRootLayout from "./client-layout";

const nunitoSans = localFont({
  src: [
    {
      path: "../assets/fonts/NunitoSans-Variable.ttf",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--nunito-font",
});

const openSans = localFont({
  src: [
    {
      path: "../assets/fonts/OpenSans-Variable.ttf",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--openSans-font",
});

const inter = localFont({
  src: [
    {
      path: "../assets/fonts/Inter-Variable.ttf",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--inter-font",
});

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
  const className = classNames(
    `flex-column space-between gap-5 page-wrapper relative`,
    nunitoSans.variable,
    inter.variable,
    openSans.variable,
  );

  return (
    <html lang="ru">
      <body className={className}>
        <ClientRootLayout>{children}</ClientRootLayout>
      </body>
    </html>
  );
}
