import React from "react";

import ProductsModalMainInputs from "./main-inputs";
import ProductsModalImages from "./images";
import NewProductModalStage from "..";
import { INewProduct } from "~/src/entities/profile-section/model";

interface Props {
  modalStage: number;
  onFileLoad: (file: File) => Promise<void>;
  currentImages: string[];
  onInputChange: (v: string, field: keyof INewProduct) => void;
  newProduct: INewProduct;
}

export default function NewProductFirstStage({
  modalStage,
  onFileLoad,
  currentImages,
  onInputChange,
  newProduct,
}: Props) {
  return (
    <NewProductModalStage
      isActive={modalStage === 1}
      className={`flex-column gap-6`}
    >
      <ProductsModalImages
        onFileLoad={onFileLoad}
        currentImages={currentImages}
      />
      <ProductsModalMainInputs
        onInputChange={onInputChange}
        newProduct={newProduct}
      />
    </NewProductModalStage>
  );
}
