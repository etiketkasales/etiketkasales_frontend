import { useCallback, useState } from "react";

import { INewProduct } from "../../model";
import { newProductSkeleton } from "../../model/seller-products.const";
import { promiseWrapper } from "~/src/shared/lib/functions/shared.func";

export const useNewProduct = (onClose: () => void) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [modalStage, setModalStage] = useState<number>(1);
  const [newProduct, setNewProduct] = useState<INewProduct>(newProductSkeleton);

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

  return {
    loading,
    onInputChange,
    newProduct,
    modalStage,
    setModalStage,
    onSave,
  };
};
