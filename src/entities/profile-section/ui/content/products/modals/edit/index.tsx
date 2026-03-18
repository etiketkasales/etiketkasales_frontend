"use client";
import {
  useEditProduct,
  useProductImages,
} from "~/src/entities/profile-section/lib/hooks/products";

import classes from "./edit.module.scss";
import Modal from "~/src/shared/ui/modals/ui/default";
import EditProductInputs from "./inputs";
import EditProductModalButtons from "./buttons";
import ProductImagesEditor from "~/src/entities/product-images-editor/ui";
import EditProductImage from "./image";
import {
  IEditSellerProduct,
  ISellerProduct,
} from "~/src/entities/profile-section/model";
import { Dispatch, SetStateAction } from "react";

interface Props {
  isActive: boolean;
  onClose: () => void;
  title: string;
  productData: ISellerProduct;
  setSellerProducts: Dispatch<SetStateAction<ISellerProduct[]>>;
}

const imagesErrorFields: (keyof IEditSellerProduct)[] = [
  "images",
  "image_upload_ids",
];

export default function EditSellerProductModal({
  isActive,
  onClose,
  title,
  productData,
  setSellerProducts,
}: Props) {
  const {
    loading,
    editProductData,
    setEditProductData,
    onInputChange,
    onSave,
    toArchive,
    deleteProduct,
    disableSave,
    error,
  } = useEditProduct({
    initialData: productData,
    onClose,
    setSellerProducts,
  });
  const { fileLoading, onFileLoad, onDeleteImage, currentImages, clearImages } =
    useProductImages({
      setProduct: setEditProductData,
      initialImages: editProductData.images,
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
      <ProductImagesEditor
        images={currentImages}
        renderImage={(image, index) => (
          <EditProductImage
            key={`${image}-${index}`}
            src={image.fileBinary ?? image.url}
            onDeleteImage={onDeleteImage}
            deleteKey={image.url}
          />
        )}
        onFileLoad={onFileLoad}
        loading={fileLoading}
        error={
          error !== null &&
          imagesErrorFields.includes(
            (error.field as keyof IEditSellerProduct) || "",
          )
        }
        containerClassName={classes.images}
        imagesListClassName={`gap-2`}
      />
      <EditProductInputs
        editData={editProductData}
        onInputChange={onInputChange}
        loading={loading}
        error={error}
      />
      <EditProductModalButtons
        onSave={async () => {
          await onSave();
          clearImages();
        }}
        onDelete={async () => await deleteProduct(productData.id)}
        toArchive={toArchive}
        disableSave={disableSave}
        loading={loading}
      />
    </Modal>
  );
}
