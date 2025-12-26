import { useCallback, useEffect, useState } from "react";
import { useFileLoad } from "~/src/shared/lib/hooks";
import { useSellerProducts } from ".";
import { uploadProductImage } from "~/src/entities/profile-section/lib/api";
import FormUtils from "~/src/shared/lib/utils/form.util";

import {
  editProductRequiredFields,
  editSellerProductSkeleton,
  IEditSellerProduct,
  ISellerProduct,
} from "~/src/entities/profile-section/model";

interface Props {
  initialData: ISellerProduct;
  onClose: () => void;
}

/**
 * Hook to edit a product in the seller profile section.
 * @param {Object} initialData - Initial product data to be edited.
 * @param {Function} onClose - Function to be called when the edit modal is closed.
 * @returns {Object} - An object containing the following properties:
 *  - loading: boolean indicating if there is a pending request.
 *  - disableSave: boolean indicating if the save button should be disabled.
 *  - editProductData: IEditSellerProduct containing the current product data to be edited.
 *  - onSave: function to be called when the save button is clicked.
 *  - fileLoading: boolean indicating if there is a pending file upload.
 *  - onFileLoad: function to be called when a file is selected to be uploaded.
 *  - onInputChange: function to be called when the input field changes.
 *  - deleteProduct: function to be called when the delete button is clicked.
 *  - error: MessageI containing the error message.
 *  - toArchive: function to be called when the archive button is clicked.
 */
export const useEditProduct = ({ initialData, onClose }: Props) => {
  const [editProductData, setEditProductData] = useState<IEditSellerProduct>(
    editSellerProductSkeleton,
  );
  const [disableSave, setDisableSave] = useState<boolean>(false);
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

  const fileLoadingCallback = useCallback(async (file: File) => {
    if (!file) return null;
    const formData = new FormData();
    formData.append("image", file);
    const res = await uploadProductImage(formData);
    return res;
  }, []);
  const { file, fileLoading, onFileLoad } = useFileLoad({
    callback: fileLoadingCallback,
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

  const getFormError = useCallback((): boolean => {
    const newError = FormUtils.getFormError({
      currentError: error,
      requiredFields: editProductRequiredFields,
      checkData: editProductData,
    });
    setError(newError);
    setDisableSave(!!newError);
    return !!newError;
  }, [editProductData, error, setError]);

  const onSave = useCallback(async () => {
    await promiseCallback(async () => {
      if (!initialData || !initialData.id) return;
      if (getFormError()) return;

      await updateProduct(editProductData, initialData.id);
      onClose();
    });
  }, [
    editProductData,
    initialData,
    updateProduct,
    getFormError,
    onClose,
    promiseCallback,
  ]);

  const toArchive = useCallback(async () => {
    await promiseCallback(async () => {
      if (!initialData?.id) return;
      const newProduct: IEditSellerProduct = {
        ...editProductData,
        status_code: "archived",
      };
      await updateProduct(newProduct, initialData.id);
      onClose();
    });
  }, [
    promiseCallback,
    updateProduct,
    onClose,
    initialData.id,
    editProductData,
  ]);

  useEffect(() => {
    if (!error) return;
    getFormError();

    //eslint-disable-next-line
  }, [getFormError]);

  useEffect(() => {
    if (!initialData) return;
    setEditProductData({
      name: initialData.name,
      description: initialData.description,
      price: initialData.price,
      status_code: initialData.status_code,
      images: initialData.images,
      image_upload_ids: [],
    });
  }, [initialData]);

  useEffect(() => {
    if (file) {
      setEditProductData((prev) => ({
        ...prev,
        images: [...prev.images, file.url],
        image_upload_ids: [...prev.image_upload_ids, file.upload_id],
      }));
    }
  }, [file]);

  return {
    loading,
    disableSave,
    editProductData,
    onSave,
    fileLoading,
    onFileLoad,
    onInputChange,
    deleteProduct,
    error,
    toArchive,
  };
};
