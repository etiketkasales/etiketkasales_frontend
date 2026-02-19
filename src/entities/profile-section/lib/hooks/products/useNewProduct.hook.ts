import { useCallback, useEffect, useState } from "react";
import { useCreateNotification } from "~/src/widgets/notifications/lib/hooks";
import { useSellerProducts, useNewProductImages, useValidation } from ".";

import { promiseWrapper } from "~/src/shared/lib/functions/shared.func";
import { createNewProduct } from "~/src/entities/profile-section/lib/api";

import { INewProduct } from "~/src/entities/profile-section/model";
import { newProductSkeleton } from "~/src/entities/profile-section/model";

interface Props {
  onClose: () => void;
}

/**
 * Hook for creating a new product.
 *
 * @param {Props} onClose - callback that is called when the modal is closed.
 *
 * @returns {Object} An object containing the following properties:
 *   loading - a boolean indicating whether the modal is loading or not.
 *   onInputChange - a callback that is called when the user changes an input field.
 *   newProduct - the data of the new product.
 *   onFileLoad - a callback that is called when the user uploads a file.
 *   currentImages - an array of objects containing the image data of the new product.
 *   onNextBtnClick - a callback that is called when the user clicks the "Next" button.
 *   setModalStage - a callback that is called when the user changes the modal stage.
 *   modalStage - a number indicating the current modal stage.
 *   error - a string containing the error message of the current modal stage.
 *   setRequiredFilters - a callback that is called when the user sets the required filters.
 *   onDeleteImage - a callback that is called when the user deletes an image.
 */
export const useNewProduct = ({ onClose }: Props) => {
  const [modalStage, setModalStage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [newProduct, setNewProduct] = useState<INewProduct>(newProductSkeleton);

  const createNotification = useCreateNotification();
  const { updateSellerProducts } = useSellerProducts({ needLoad: false });
  const { error, getStageError, setRequiredFilters } = useValidation({
    checkData: newProduct,
  });
  const { fileLoading, onFileLoad, currentImages, onDeleteImage } =
    useNewProductImages({ setNewProduct });

  const onInputChange = useCallback(
    (v: string, field: keyof INewProduct) => {
      setNewProduct({
        ...newProduct,
        [field]: v,
      });
    },
    [newProduct],
  );

  const onSave = useCallback(async () => {
    await promiseWrapper({
      setLoading,
      callback: async () => {
        await createNewProduct(newProduct);
        await updateSellerProducts();
        createNotification("Товар добавлен", "success");
        onClose();
      },
      fallback: () => createNotification("Не удалось добавить товар", "error"),
    });
  }, [onClose, updateSellerProducts, newProduct, createNotification]);

  const onNextBtnClick = useCallback(async () => {
    const hasError = getStageError(modalStage);
    if (hasError) return;

    if (modalStage === 2) {
      await onSave();
    } else {
      setModalStage(2);
    }
  }, [modalStage, onSave, getStageError]);

  useEffect(() => {
    if (!error) return;
    getStageError(modalStage);
  }, [modalStage, getStageError, error]);

  return {
    loading: loading || fileLoading,
    onInputChange,
    newProduct,
    onFileLoad,
    currentImages,
    onNextBtnClick,
    setModalStage,
    modalStage,
    error,
    setRequiredFilters,
    onDeleteImage,
  };
};
