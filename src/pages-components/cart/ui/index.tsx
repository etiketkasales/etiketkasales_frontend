"use client";
import React from "react";
import CartHeader from "~/src/entities/cart-header/ui";

import PageWrapper from "~/src/entities/page-wrapper/ui";
import CartSection from "~/src/features/cart/ui";

export default function CartPage() {
  return (
    <PageWrapper CustomHeader={<CartHeader />}>
      <CartSection />
    </PageWrapper>
  );
}
