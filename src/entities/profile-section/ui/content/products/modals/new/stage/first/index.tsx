import React from "react";

import ProductsModalMainInputs from "./main-inputs";
import ProductsModalImages from "./images";
import NewProductModalStage from "..";
import { INewProduct } from "~/src/entities/profile-section/model";
import { MessageI } from "~/src/shared/model";

interface Props {
  modalStage: number;
  onFileLoad: (file: File) => Promise<void>;
  currentImages: string[];
  onInputChange: (v: string, field: keyof INewProduct) => void;
  newProduct: INewProduct;
  error: MessageI | null;
}

export default function NewProductFirstStage({
  modalStage,
  onFileLoad,
  currentImages,
  onInputChange,
  newProduct,
  error,
}: Props) {
  return (
    <NewProductModalStage
      isActive={modalStage === 1}
      className={`flex-column gap-6`}
    >
      <ProductsModalImages
        onFileLoad={onFileLoad}
        currentImages={currentImages}
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
