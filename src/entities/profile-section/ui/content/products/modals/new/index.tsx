"use client";
import React from "react";
import { useNewProduct } from "~/src/entities/profile-section/lib/hooks";

import classes from "./products-modal.module.scss";
import Modal from "~/src/shared/ui/modals/ui/default";
import LoaderCircle from "~/src/shared/ui/loader-circle";
import NewProductModalButtons from "./buttons";
import NewProductFirstStage from "./stage/first";
import NewProductSecondStage from "./stage/second";

interface Props {
  isActive: boolean;
  onClose: () => void;
  title?: string;
}

export default function NewSellerProductModal({
  isActive,
  onClose,
  title = "Добавить товар",
}: Props) {
  const {
    loading,
    onInputChange,
    newProduct,
    onFileLoad,
    currentImages,
    modalStage,
    setModalStage,
    error,
    onNextBtnClick,
  } = useNewProduct({
    onClose,
  });

  return (
    <Modal
      isOpen={isActive}
      onClose={() => onClose()}
      title={title}
      containerClassName={`flex-column space-between ${classes.container}`}
      needBackButton={false}
    >
      {loading && <LoaderCircle radius={20} />}
      <NewProductFirstStage
        modalStage={modalStage}
        onFileLoad={onFileLoad}
        currentImages={currentImages}
        onInputChange={onInputChange}
        newProduct={newProduct}
        error={error}
      />
      <NewProductSecondStage
        modalStage={modalStage}
        onInputChange={onInputChange}
        newProduct={newProduct}
        error={error}
      />
      <NewProductModalButtons
        modalStage={modalStage}
        onNext={onNextBtnClick}
        onPrev={() => setModalStage(1)}
      />
    </Modal>
  );
}
