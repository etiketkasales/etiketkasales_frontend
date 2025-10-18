import React from "react";

import Tabs from "~/src/widgets/tabs/ui";
import Footer from "~/src/entities/footer/ui";
import HeaderDefault from "~/src/entities/header-default/ui";

export default function PageWrapper({
  children,
  CustomHeader,
  TabsButton,
}: {
  children: React.ReactNode;
  CustomHeader?: React.ReactNode;
  TabsButton?: React.ReactNode;
}) {
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
      <Tabs TabsButton={TabsButton} />
    </>
  );
}
