"use client";
import React from "react";
import { useNewProduct } from "~/src/entities/profile-section/lib/hooks";

import classes from "./products-modal.module.scss";
import Modal from "~/src/shared/ui/modals/ui/default";
import NewProductModalButtons from "./buttons";
import NewProductFirstStage from "./stage/first";
import NewProductSecondStage from "./stage/second";
import { INewProduct } from "~/src/entities/profile-section/model";

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
    onDeleteImage,
    setRequiredFilters,
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
      loading={loading}
      loaderRadius={20}
    >
      <NewProductFirstStage
        modalStage={modalStage}
        onFileLoad={onFileLoad}
        currentImages={currentImages}
        onInputChange={onInputChange}
        newProduct={newProduct}
        error={error}
        onDeleteImage={onDeleteImage}
      />
      <NewProductSecondStage
        modalStage={modalStage}
        onInputChange={onInputChange}
        newProduct={newProduct}
        error={error}
        setRequiredFields={(requiredFields) =>
          setRequiredFilters(requiredFields)
        }
      />
      <NewProductModalButtons
        modalStage={modalStage}
        onNext={onNextBtnClick}
        onPrev={() => setModalStage(1)}
      />
    </Modal>
  );
}
