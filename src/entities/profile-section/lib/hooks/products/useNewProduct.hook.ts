import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useCreateNotification } from "~/src/widgets/notifications/lib/hooks";
import { useSellerProducts, useProductImages, useValidation } from ".";

import { promiseWrapper } from "~/src/shared/lib/functions/shared.func";
import { createNewProduct } from "~/src/entities/profile-section/lib/api";

import {
  INewProduct,
  ISellerProduct,
} from "~/src/entities/profile-section/model";
import { newProductSkeleton } from "~/src/entities/profile-section/model";

interface Props {
  onClose: () => void;
  setSellerProducts: Dispatch<SetStateAction<ISellerProduct[]>>;
}

/**
 * Hook for adding a new product.
 * @param {Props} onClose - a callback that is called when the modal is closed.
 * @param {Props} setSellerProducts - a callback that is called when the seller products are updated.
 * @returns {Object} - an object containing the following properties:
 *   loading - a boolean indicating whether the modal is loading or not.
 *   onInputChange - a callback that is called when the user changes an input field.
 *   newProduct - the data of the new product.
 *   onFileLoad - a callback that is called when the user loads a product image.
 *   currentImages - an array of product images.
 *   onNextBtnClick - a callback that is called when the user clicks the "Next" button.
 *   setModalStage - a callback that is called when the user changes the modal stage.
 *   modalStage - a number indicating the current modal stage.
 *   error - a string indicating the error message of the current modal stage.
 *   setRequiredFilters - a callback that is called when the user sets the required filters.
 *   onDeleteImage - a callback that is called when the user deletes a product image.
 */
export const useNewProduct = ({ onClose, setSellerProducts }: Props) => {
  const [modalStage, setModalStage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [newProduct, setNewProduct] = useState<INewProduct>(newProductSkeleton);

  const createNotification = useCreateNotification();
  const { updateSellerProducts } = useSellerProducts({
    needLoad: false,
    setSellerProducts,
  });
  const { error, getStageError, setRequiredFilters } = useValidation({
    checkData: newProduct,
  });
  const {
    fileLoading,
    onFileLoad,
    currentImages,
    setCurrentImages,
    onDeleteImage,
  } = useProductImages<INewProduct>({ setProduct: setNewProduct });

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
        await createNewProduct({
          ...newProduct,
          status_code: "pending",
        });
        await updateSellerProducts();
        createNotification("Товар добавлен", "success");
        setNewProduct(newProductSkeleton);
        setCurrentImages([]);
        setModalStage(1);
        onClose();
      },
      fallback: (errMessage) =>
        createNotification(errMessage || "Не удалось добавить товар", "error"),
    });
  }, [
    newProduct,
    updateSellerProducts,
    createNotification,
    setCurrentImages,
    onClose,
  ]);

  const onNextBtnClick = useCallback(async () => {
    const hasError = getStageError(modalStage);
    if (hasError) return;

    if (modalStage === 2) {
      await onSave();
    } else {
      setModalStage(2);
    }
  }, [modalStage, onSave, getStageError]);

  const onSaveDraft = useCallback(async () => {
    await promiseWrapper({
      setLoading,
      callback: async () => {
        await createNewProduct({
          ...newProduct,
          status_code: "draft",
        });
        await updateSellerProducts();
        createNotification("Черновик сохранён", "success");
        setNewProduct(newProductSkeleton);
        setCurrentImages([]);
        setModalStage(1);
        onClose();
      },
      fallback: (errMessage) =>
        createNotification(
          errMessage || "Не удалось сохранить черновик",
          "error",
        ),
    });
  }, [
    onClose,
    updateSellerProducts,
    newProduct,
    createNotification,
    setCurrentImages,
  ]);

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
    onSaveDraft,
    setModalStage,
    modalStage,
    error,
    setRequiredFilters,
    onDeleteImage,
  };
};
