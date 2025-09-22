"use client";
import React from "react";
import ForBussinessSection from "~/src/entities/for-bussiness/ui";
import HeaderRegister from "~/src/entities/header-register/ui";
import PageWrapper from "~/src/entities/page-wrapper/ui";

export default function ForBussinessPage() {
  return (
    <PageWrapper CustomHeader={<HeaderRegister />}>
      <ForBussinessSection />
    </PageWrapper>
  );
}
