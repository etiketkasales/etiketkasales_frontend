"use client";
import React, { useCallback, useState } from "react";
import AddCompanyModal from "~/src/entities/add-company-modal/ui";
import CartHeader from "~/src/entities/cart-header/ui";

import PageWrapper from "~/src/entities/page-wrapper/ui";
import CartSection from "~/src/features/cart/ui";

export default function CartPage() {
  const [modal, setModal] = useState<boolean | null>(null);

  const openModal = useCallback(() => {
    setModal(true);
  }, []);

  return (
    <PageWrapper CustomHeader={<CartHeader />}>
      <CartSection openModal={openModal} />
      {modal !== null && (
        <AddCompanyModal isOpen={modal} onClose={() => setModal(false)} />
      )}
    </PageWrapper>
  );
}
