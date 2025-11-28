import { useCallback, useEffect, useState } from "react";
import { useFileLoad } from "~/src/shared/lib/hooks";
import { uploadProductImage } from "../api";
import { promiseWrapper } from "~/src/shared/lib/functions/shared.func";

import { INewProduct } from "../../model";
import { newProductSkeleton } from "../../model/seller-products.const";

export const useNewProduct = (onClose: () => void) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [modalStage, setModalStage] = useState<number>(1);
  const [newProduct, setNewProduct] = useState<INewProduct>(newProductSkeleton);
  const [currentImages, setCurrentImages] = useState<string[]>([]);

  const readFile = useCallback(
    (file: File) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const imageUrl = fileReader.result?.toString() || "";
        if (imageUrl) {
          setCurrentImages([...currentImages, imageUrl]);
        }
      };
      fileReader.readAsDataURL(file);
    },
    [currentImages],
  );

  const { onFileLoad, fileId, fileLoading } = useFileLoad({
    callback: useCallback(
      async (file: File) => {
        if (!file) return null;
        readFile(file);
        const res = await uploadProductImage(file);
        return res;
      },
      [readFile],
    ),
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
        onClose();
      },
    });
  }, [onClose]);

  useEffect(() => {
    if (!fileId) return;

    setNewProduct((n) => ({
      ...n,
      image_uploads_ids: [...new Set([...n.image_uploads_ids, fileId])],
    }));
  }, [fileId, newProduct.image_uploads_ids]);

  return {
    loading: loading || fileLoading,
    onInputChange,
    newProduct,
    modalStage,
    setModalStage,
    onSave,
    onFileLoad,
    currentImages,
  };
};
