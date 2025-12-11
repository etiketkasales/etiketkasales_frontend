import { useCallback, useEffect, useState } from "react";
import { useFileLoad } from "~/src/shared/lib/hooks";
import { useSellerProducts } from "./useSellerProducts.hook";
import { useValidation } from "./useValidation.hook";
import {
  createNewProduct,
  uploadProductImage,
} from "~/src/entities/profile-section/lib/api";
import { promiseWrapper } from "~/src/shared/lib/functions/shared.func";

import { INewProduct } from "~/src/entities/profile-section/model";
import { newProductSkeleton } from "~/src/entities/profile-section/model";

interface Props {
  onClose: () => void;
}

export const useNewProduct = ({ onClose }: Props) => {
  const { updateSellerProducts } = useSellerProducts({ needLoad: false });
  const [modalStage, setModalStage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [newProduct, setNewProduct] = useState<INewProduct>(newProductSkeleton);
  const [currentImages, setCurrentImages] = useState<string[]>([]);

  const { onFileLoad, file, fileLoading } = useFileLoad({
    callback: useCallback(async (file: File, fileBinary?: string) => {
      if (!file) return null;
      const formData = new FormData();
      formData.append("image", file);

      const res = await uploadProductImage(formData);
      if (fileBinary) {
        setCurrentImages((prev) => [...prev, fileBinary]);
      }
      return res;
    }, []),
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
        onClose();
      },
    });
  }, [onClose, updateSellerProducts, newProduct]);

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
    if (!file || !file.upload_id) return;

    setNewProduct((n) => ({
      ...n,
      image_uploads_ids: [...new Set([...n.image_uploads_ids, file.upload_id])],
      images: [...new Set([...n.images, file.filename || ""])],
    }));
  }, [file]);

  useEffect(() => {
    if (!error) return;
    getStageError(modalStage);

    //eslint-disable-next-line
  }, [modalStage, getStageError]);

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
  };
};
