import { useCallback, useEffect } from "react";
import { useCreateNotification } from "~/src/widgets/notifications/lib/hooks";

import FormUtils from "~/src/shared/lib/utils/form.util";

import {
  editProductRequiredFields,
  IEditSellerProduct,
  sellerProductsMessages,
} from "~/src/entities/profile-section/model";
import { MessageI } from "~/src/shared/model";

interface Props {
  editProductData: IEditSellerProduct;
  setDisableSave: (v: boolean) => void;
  error: MessageI | null;
  setError: (e: MessageI | null) => void;
}

export const useEditProductValidation = ({
  editProductData,
  setDisableSave,
  error,
  setError,
}: Props) => {
  const createNotification = useCreateNotification();
  const getFormError = useCallback((): boolean => {
    const newError = FormUtils.getFormError({
      currentError: error,
      requiredFields: editProductRequiredFields,
      checkData: editProductData,
    });
    if (newError) createNotification(sellerProductsMessages.formError, "error");
    setError(newError);
    setDisableSave(!!newError);
    return !!newError;
  }, [editProductData, error, setError, createNotification]);

  useEffect(() => {
    if (error) {
      getFormError();
    }
  }, [getFormError, error]);
  return getFormError;
};
