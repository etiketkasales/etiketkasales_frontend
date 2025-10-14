"use client";
import React from "react";
import { useWindowSize } from "react-use";

import Tabs from "~/src/widgets/tabs/ui";
import Footer from "~/src/entities/footer/ui";
import HeaderDefault from "../../header-default/ui";

export default function PageWrapper({
  children,
  CustomHeader,
  TabsButton,
}: {
  children: React.ReactNode;
  CustomHeader?: React.ReactNode;
  TabsButton?: React.ReactNode;
}) {
  const { width } = useWindowSize();

  return (
    <>
      {CustomHeader ? CustomHeader : <HeaderDefault />}
      <main
        className={`wrapper flex-column gap-5`}
        style={{ marginBottom: "auto" }}
      >
        {children}
      </main>
      <Footer />
      {width <= 768 ? <Tabs TabsButton={TabsButton} /> : null}
    </>
  );
}
