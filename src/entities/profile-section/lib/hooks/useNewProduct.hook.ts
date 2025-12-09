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

  const { onFileLoad, file, fileLoading } = useFileLoad({
    callback: useCallback(async (fileBinary: string) => {
      if (!fileBinary) return null;
      setCurrentImages((prev) => [...prev, fileBinary]);
      const res = await uploadProductImage(fileBinary);
      return res;
    }, []),
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
    if (!file || !file.upload_id) return;

    setNewProduct((n) => ({
      ...n,
      image_uploads_ids: [...new Set([...n.image_uploads_ids, file.upload_id])],
    }));
  }, [file, newProduct.image_uploads_ids]);

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
