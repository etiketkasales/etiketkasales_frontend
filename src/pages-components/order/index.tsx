"use client";
import React, { useEffect, useState } from "react";

import OrderSection from "~/src/entities/order/ui";
import PageWrapper from "~/src/entities/page-wrapper/ui";

export default function OrderPage() {
  const [forCompany, setForCompany] = useState<boolean>(false);

  useEffect(() => {
    if (!window) return;

    const company = window.location.href.includes("order/company");
    if (company) {
      setForCompany(true);
    }
  }, []);

  return (
    <PageWrapper>
      <OrderSection forCompany={forCompany} />
    </PageWrapper>
  );
}
