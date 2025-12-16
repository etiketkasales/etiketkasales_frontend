import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "~/src/app/store/hooks";
import { addNotification } from "~/src/app/store/reducers/notifications.slice";
import { promiseWrapper } from "~/src/shared/lib/functions/shared.func";
import {
  deleteSellerProduct,
  editSellerProduct,
  getSellerProducts,
} from "~/src/entities/profile-section/lib/api";

import { MessageI } from "~/src/shared/model";
import {
  IEditSellerProduct,
  ISellerProduct,
  ISellerProductsModal,
} from "~/src/entities/profile-section/model";

interface Props {
  onClose?: () => void;
  needLoad?: boolean;
}

export const useSellerProducts = ({ onClose, needLoad }: Props) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<MessageI | null>(null);
  const [sellerProducts, setSellerProducts] = useState<ISellerProduct[]>([]);
  const [modal, setModal] = useState<ISellerProductsModal>({
    active: null,
    type: "new",
  });
  const [editProductId, setEditProductId] = useState<number>(0);

  const promiseCallback = useCallback(async (callback: () => Promise<void>) => {
    await promiseWrapper({
      setLoading,
      setError,
      callback,
    });
  }, []);

  const updateSellerProducts = useCallback(async () => {
    await promiseCallback(async () => {
      const res = await getSellerProducts();
      if (res) {
        setSellerProducts(res.products);
      }
    });
  }, [promiseCallback]);

  const deleteProduct = useCallback(
    async (id: number) => {
      await promiseCallback(async () => {
        await deleteSellerProduct(id);
        dispatch(
          addNotification({
            message: "Товар удалён",
            type: "success",
            field: "global",
          }),
        );
        await updateSellerProducts();
        onClose?.();
      });
    },
    [promiseCallback, updateSellerProducts, onClose, dispatch],
  );

  const updateProduct = useCallback(
    async (data: IEditSellerProduct, id: number) => {
      await promiseCallback(async () => {
        await editSellerProduct(data, id);
        await updateSellerProducts();
        dispatch(
          addNotification({
            message: "Товар изменён",
            type: "success",
            field: "global",
          }),
        );
        onClose?.();
      });
    },
    [promiseCallback, updateSellerProducts, onClose, dispatch],
  );

  useEffect(() => {
    if (!needLoad) return;
    updateSellerProducts();
  }, [updateSellerProducts, needLoad]);

  return {
    loading,
    promiseCallback,
    error,
    setError,
    sellerProducts,
    updateSellerProducts,
    modal,
    setModal,
    editProductId,
    setEditProductId,
    updateProduct,
    deleteProduct,
  };
};
