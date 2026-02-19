import { useCallback, useEffect, useRef, useState } from "react";
import { useValidation } from ".";
import { addNotification } from "~/src/app/store/reducers/notifications.slice";
import { useFileLoad } from "~/src/shared/lib/hooks";
import { useSellerProducts } from "./useSellerProducts.hook";
import { useAppDispatch } from "~/src/app/store/hooks";
import {
  createNewProduct,
  uploadProductImage,
} from "~/src/entities/profile-section/lib/api";
import { promiseWrapper } from "~/src/shared/lib/functions/shared.func";

import {
  INewProduct,
  INewProductCurrentImage,
} from "~/src/entities/profile-section/model";
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
  const dispatch = useAppDispatch();
  const { updateSellerProducts } = useSellerProducts({ needLoad: false });
  const [modalStage, setModalStage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [newProduct, setNewProduct] = useState<INewProduct>(newProductSkeleton);
  const [currentImages, setCurrentImages] = useState<INewProductCurrentImage[]>(
    [],
  );

  const fileUploadCallback = useCallback(
    async (file: File, fileBinary?: string) => {
      if (!file) return null;
      const formData = new FormData();
      formData.append("image", file);
      const res = await uploadProductImage(formData);
      if (fileBinary) {
        setCurrentImages((prev) => [
          ...prev,
          {
            upload_id: res.upload_id,
            url: res.url,
            fileBinary,
          },
        ]);
      }
      return res;
    },
    [],
  );

  const { onFileLoad, fileLoading } = useFileLoad({
    callback: fileUploadCallback,
  });

  const { error, getStageError, setRequiredFilters } = useValidation({
    checkData: newProduct,
  });

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
        dispatch(
          addNotification({
            message: "Товар добавлен",
            type: "success",
            field: "global",
          }),
        );
        onClose();
      },
    });
  }, [onClose, updateSellerProducts, newProduct, dispatch]);

  const onNextBtnClick = useCallback(async () => {
    const hasError = getStageError(modalStage);
    if (hasError) return;

    if (modalStage === 2) {
      await onSave();
    } else {
      setModalStage(2);
    }
  }, [modalStage, onSave, getStageError]);

  const onDeleteImage = useCallback((image: INewProductCurrentImage) => {
    setCurrentImages((prev) =>
      prev.filter((i) => i.upload_id !== image.upload_id),
    );
    setNewProduct((n) => ({
      ...n,
      image_upload_ids: n.image_upload_ids.filter(
        (id: number) => id !== image.upload_id,
      ),
      images: n.images.filter((i) => i !== image.url),
    }));
  }, []);

  useEffect(() => {
    setNewProduct((n) => ({
      ...n,
      image_upload_ids: [...new Set(currentImages.map((i) => i.upload_id))],
      images: [...new Set(currentImages.map((i) => i.url))],
    }));
  }, [currentImages]);

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
