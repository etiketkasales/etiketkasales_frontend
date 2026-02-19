import { useCallback, useState } from "react";
import {
  useEditProductInit,
  useEditProductValidation,
  useSellerProducts,
} from ".";
import { useCreateNotification } from "~/src/widgets/notifications/lib/hooks";

import {
  IEditSellerProduct,
  ISellerProduct,
  sellerProductsMessages,
} from "~/src/entities/profile-section/model";

interface Props {
  initialData: ISellerProduct;
  onClose: () => void;
}

/**
 * Hook for editing a product.
 * @param {Props} initialData - the initial data of the product to edit.
 * @param {Props} onClose - a callback that is called when the modal is closed.
 * @returns {Object} - an object containing the following properties:
 *   loading - a boolean indicating whether the modal is loading or not.
 *   disableSave - a boolean indicating whether the "Save" button is disabled or not.
 *   editProductData - the data of the product to edit.
 *   setEditProductData - a callback that is called when the user changes the product data.
 *   onSave - a callback that is called when the user clicks the "Save" button.
 *   onInputChange - a callback that is called when the user changes an input field.
 *   deleteProduct - a callback that is called when the user deletes a product.
 *   error - a string indicating the error message of the current modal stage.
 *   toArchive - a callback that is called when the user archives a product.
 */
export const useEditProduct = ({ initialData, onClose }: Props) => {
  const productId = initialData?.id;
  const [disableSave, setDisableSave] = useState<boolean>(false);

  const createNotification = useCreateNotification();
  // Инициализация editProductData
  const { editProductData, setEditProductData } = useEditProductInit({
    initialData,
  });
  // Основные действия с товаром
  const {
    updateProduct,
    deleteProduct,
    loading,
    promiseCallback,
    error,
    setError,
  } = useSellerProducts({
    onClose,
    needLoad: false,
  });
  // Валидация формы
  const getFormError = useEditProductValidation({
    editProductData,
    setDisableSave,
    error,
    setError,
  });

  const onInputChange = useCallback(
    (field: keyof IEditSellerProduct, v: string) => {
      setEditProductData((prev) => ({
        ...prev,
        [field]: v,
      }));
    },
    [],
  );

  // Сохранение изменений в общем
  const handleSave = useCallback(
    async (data: IEditSellerProduct, message: string) => {
      await promiseCallback(async () => {
        if (!productId) return;

        await updateProduct(data, productId);
        createNotification(message, "success");
        onClose();
      });
    },
    [productId, promiseCallback, updateProduct, createNotification, onClose],
  );

  // Сохранение измененных полей
  const onSave = useCallback(async () => {
    if (getFormError()) return;

    await handleSave(editProductData, sellerProductsMessages.productSaved);
  }, [editProductData, getFormError, handleSave]);

  // Отправление в архив отдельно для удобства
  const toArchive = useCallback(async () => {
    await handleSave(
      {
        ...editProductData,
        status_code: "archived",
      },
      sellerProductsMessages.productArchived,
    );
  }, [editProductData, handleSave]);

  return {
    loading,
    disableSave,
    editProductData,
    setEditProductData,
    onSave,
    onInputChange,
    deleteProduct,
    error,
    toArchive,
  };
};
