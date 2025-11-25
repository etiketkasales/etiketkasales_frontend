"use client";
import React, { useCallback, useState } from "react";
import { useCart } from "~/src/features/cart/lib/hooks/useCart.hook";

import CartHeader from "~/src/entities/cart-header/ui";
import AddCompanyModal from "~/src/entities/add-company-modal/ui";
import PageWrapper from "~/src/entities/page-wrapper/ui";
import CartSection from "~/src/features/cart/ui";

export default function CartPage() {
  const {
    selectedItems,
    sellerItems,
    handleSelectItem,
    onCheckboxChange,
    deleteMarked,
    loading,
  } = useCart();
  const [modal, setModal] = useState<boolean | null>(null);

  const openModal = useCallback(() => {
    setModal(true);
  }, []);

  return (
    <PageWrapper
      CustomHeader={
        <CartHeader
          onCheckboxChange={onCheckboxChange}
          deleteMarked={deleteMarked}
        />
      }
    >
      <CartSection
        openModal={openModal}
        loading={loading}
        sellerItems={sellerItems}
        selectedItems={selectedItems}
        handleSelectItem={handleSelectItem}
        onCheckboxChange={onCheckboxChange}
        deleteMarked={deleteMarked}
      />
      {modal !== null && (
        <AddCompanyModal isOpen={modal} onClose={() => setModal(false)} />
      )}
    </PageWrapper>
  );
}
