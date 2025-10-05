"use client";
import React, { useEffect, useState } from "react";
import HeaderWithText from "~/src/entities/header-with-text/ui";

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
    <PageWrapper CustomHeader={<HeaderWithText text="Оформление заказа" />}>
      <OrderSection forCompany={forCompany} />
    </PageWrapper>
  );
}
