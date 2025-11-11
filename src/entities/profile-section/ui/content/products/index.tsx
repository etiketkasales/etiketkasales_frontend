"use client";
import React, { useState } from "react";

import classes from "./products.module.scss";
import ProfileContentContainer from "../container";
import AddNewProductButton from "./add-new";
import ProfileProductsList from "./list";
import ProfileProductsModal from "./modal";
import { profileTitlesMap } from "~/src/entities/profile-section/model";

interface Props {}

export default function ProfileProducts({}: Props) {
  const [modalActive, setModalActive] = useState<boolean | null>(null);
  return (
    <ProfileContentContainer
      title={profileTitlesMap.products}
      className={`flex-column ${classes.container}`}
    >
      <ProfileProductsList products={[]} />
      <AddNewProductButton
        onClick={() => setModalActive(true)}
        disabled={false}
        productsLength={2}
      />
      {modalActive !== null && (
        <ProfileProductsModal
          isActive={modalActive}
          onClose={() => setModalActive(false)}
        />
      )}
    </ProfileContentContainer>
  );
}
