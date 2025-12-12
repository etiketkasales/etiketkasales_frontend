import React from "react";

import ProductsModalMainInputs from "./main-inputs";
import ProductsModalImages from "./images";
import NewProductModalStage from "..";
import { MessageI } from "~/src/shared/model";
import {
  INewProduct,
  INewProductCurrentImage,
} from "~/src/entities/profile-section/model";

interface Props {
  modalStage: number;
  onFileLoad: (file: File) => Promise<void>;
  currentImages: INewProductCurrentImage[];
  onInputChange: (v: string, field: keyof INewProduct) => void;
  newProduct: INewProduct;
  error: MessageI | null;
  onDeleteImage: (image: INewProductCurrentImage) => void;
}

export default function NewProductFirstStage({
  modalStage,
  onFileLoad,
  currentImages,
  onInputChange,
  newProduct,
  error,
  onDeleteImage,
}: Props) {
  return (
    <NewProductModalStage
      isActive={modalStage === 1}
      className={`flex-column gap-6`}
    >
      <ProductsModalImages
        onFileLoad={onFileLoad}
        currentImages={currentImages}
        onDeleteImage={onDeleteImage}
        error={error}
      />
      <ProductsModalMainInputs
        onInputChange={onInputChange}
        newProduct={newProduct}
        error={error}
      />
    </NewProductModalStage>
  );
}
