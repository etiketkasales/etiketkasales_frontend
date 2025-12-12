"use client";
import React from "react";
import { useSellerProducts } from "~/src/entities/profile-section/lib/hooks";

import classes from "./products.module.scss";
import ProfileContentContainer from "../container";
import AddNewProductButton from "./add-new";
import ProfileProductsList from "./list";
import LoaderCircle from "~/src/shared/ui/loader-circle";
import SellerProductModal from "./modals";
import {
  modalTitles,
  profileTitlesMap,
  sellerProductsTest,
} from "~/src/entities/profile-section/model";

interface Props {}

export default function ProfileProducts({}: Props) {
  const {
    sellerProducts,
    loading,
    modalType,
    setModalType,
    editProductId,
    setEditProductId,
  } = useSellerProducts({ needLoad: true });

  return (
    <ProfileContentContainer
      title={profileTitlesMap.products}
      className={`flex-column ${classes.container}`}
    >
      {loading && <LoaderCircle radius={20} className={classes.loader} />}
      <ProfileProductsList
        products={sellerProductsTest}
        setModalId={(n) => setEditProductId(n)}
        setModalActive={() => setModalType("edit")}
      />
      <AddNewProductButton
        onClick={() => setModalType("new")}
        disabled={false}
        productsLength={sellerProductsTest?.length || 0}
      />
      {modalType !== null && (
        <SellerProductModal
          type={modalType}
          onClose={() => setModalType(null)}
          title={modalTitles[modalType] || ""}
          editProductId={editProductId}
          products={sellerProductsTest}
        />
      )}
    </ProfileContentContainer>
  );
}
