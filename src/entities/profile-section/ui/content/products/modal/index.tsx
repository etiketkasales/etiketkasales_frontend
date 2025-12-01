import React from "react";
import { useNewProduct } from "~/src/entities/profile-section/lib/hooks";

import classes from "./products-modal.module.scss";
import Modal from "~/src/shared/ui/modals/ui/default";
import ProductsModalImages from "./stage/first/images";
import LoaderCircle from "~/src/shared/ui/loader-circle";
import NewProductModalButtons from "./buttons";
import NewProductModalStage from "./stage";
import NewProductFirstStage from "./stage/first";
import NewProductSecondStage from "./stage/second";

interface Props {
  isActive: boolean;
  onClose: () => void;
  title?: string;
}

export default function ProfileProductsModal({
  isActive,
  onClose,
  title = "Добавить товар",
}: Props) {
  const {
    loading,
    onInputChange,
    newProduct,
    modalStage,
    setModalStage,
    onSave,
    onFileLoad,
    currentImages,
  } = useNewProduct(onClose);

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
      />
      <NewProductSecondStage
        modalStage={modalStage}
        onInputChange={onInputChange}
        newProduct={newProduct}
      />
      <NewProductModalButtons
        modalStage={modalStage}
        setModalStage={(n) => setModalStage(n)}
        onSave={onSave}
      />
    </Modal>
  );
}
