"use client";
import React from "react";
import { useEditProduct } from "~/src/entities/profile-section/lib/hooks/products/useEditProduct.hook";

import classes from "./edit.module.scss";
import LoaderCircle from "~/src/shared/ui/loader-circle";
import Modal from "~/src/shared/ui/modals/ui/default";
import EditProductImage from "./images";
import EditProductInputs from "./inputs";
import EditProductModalButtons from "./buttons";
import { ISellerProduct } from "~/src/entities/profile-section/model";

interface Props {
  isActive: boolean;
  onClose: () => void;
  title: string;
  productData: ISellerProduct;
}

export default function EditSellerProductModal({
  isActive,
  onClose,
  title,
  productData,
}: Props) {
  const {
    loading,
    editProductData,
    onInputChange,
    onSave,
    toArchive,
    fileLoading,
    onFileLoad,
    deleteProduct,
    disableSave,
    error,
  } = useEditProduct({
    initialData: productData,
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
      <EditProductImage
        onFileUpload={onFileLoad}
        imagePreview={editProductData.images?.[0] || ""}
        loading={fileLoading}
        error={error}
      />
      <EditProductInputs
        editData={editProductData}
        onInputChange={onInputChange}
        loading={loading}
        error={error}
      />
      <EditProductModalButtons
        onSave={onSave}
        onDelete={async () => await deleteProduct(productData.id)}
        toArchive={toArchive}
        disableSave={disableSave}
        loading={loading}
      />
    </Modal>
  );
}
