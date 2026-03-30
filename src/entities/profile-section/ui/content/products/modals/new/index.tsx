"use client";
import { useNewProduct } from "~/src/entities/profile-section/lib/hooks";

import classes from "./products-modal.module.scss";
import Modal from "~/src/shared/ui/modals/ui/default";
import NewProductModalButtons from "./buttons";
import NewProductFirstStage from "./stage/first";
import NewProductSecondStage from "./stage/second";
import { Dispatch, SetStateAction } from "react";
import { ISellerProduct } from "~/src/entities/profile-section/model";

interface Props {
  isActive: boolean;
  onClose: () => void;
  setSellerProducts: Dispatch<SetStateAction<ISellerProduct[]>>;
  title?: string;
}

export default function NewSellerProductModal({
  isActive,
  onClose,
  setSellerProducts,
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
    onSaveDraft,
    onDeleteImage,
    setRequiredFilters,
  } = useNewProduct({
    onClose,
    setSellerProducts,
  });

  return (
    <Modal
      isOpen={isActive}
      onClose={onClose}
      title={title}
      containerClassName={`flex-column space-between ${classes.container}`}
      needBackButton={true}
      loading={loading}
      loaderRadius={20}
      needPreventOnClick={false}
    >
      <NewProductFirstStage
        modalStage={modalStage}
        onFileLoad={onFileLoad}
        currentImages={currentImages}
        onInputChange={onInputChange}
        newProduct={newProduct}
        error={error}
        onDeleteImage={onDeleteImage}
        loading={loading}
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
        onSaveDraft={onSaveDraft}
        onPrev={() => setModalStage(1)}
      />
    </Modal>
  );
}
