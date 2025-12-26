import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "~/src/app/store/hooks";
import { addNotification } from "~/src/app/store/reducers/notifications.slice";
import { useOrderOperations } from ".";
import FormUtils from "~/src/shared/lib/utils/form.util";
import { promiseWrapper } from "~/src/shared/lib";

import {
  OrderOperationFormMap,
  SellerOrderOperationType,
} from "~/src/entities/profile-section/model";
import { MessageI } from "~/src/shared/model";

interface Props<T extends SellerOrderOperationType> {
  type: T;
  orderId: number;
  initialData: OrderOperationFormMap[T];
  closeModal?: () => void;
}

/**
 * useOrderOperation - use this hook to send accept, reject, delivery or close order
 * @param {Object} props - props for hook
 * @param {SellerOrderOperationType} props.type - type of operation
 * @param {object} props.initialData - initial data for operation
 * @param {number} props.orderId - id of order
 * @param {Function} props.closeModal - callback to close modal
 * @returns {Object} - object with onSubmit, onInputChange, formData, loading, error
 */
export const useOrderOperation = <T extends SellerOrderOperationType>({
  type,
  initialData,
  orderId,
  closeModal,
}: Props<T>) => {
  const dispatch = useAppDispatch();
  const { orderOperationsMap } = useOrderOperations();
  const [formData, setFormData] = useState<OrderOperationFormMap[T] | null>(
    initialData,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<MessageI | null>(null);

  const onInputChange = useCallback(
    <K extends keyof OrderOperationFormMap[T]>(
      value: OrderOperationFormMap[T][K],
      field: K,
    ) => {
      setFormData((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          [field]: value,
        };
      });
    },
    [],
  );

  const isValidForm = useCallback((): boolean => {
    const fd = formData;
    if (!fd) return true;
    const keys = Object.keys(fd || {});
    if (!keys.length) return true;

    const newError = FormUtils.getFormError({
      currentError: error,
      checkData: fd,
      requiredFields: Object.keys(fd || {}) as (keyof typeof fd)[],
    });

    if (newError) {
      setError(newError);
      return false;
    }

    setError(null);
    return true;
  }, [formData, error]);

  const onSubmit = useCallback(async () => {
    const callback = orderOperationsMap[type];
    if (!callback) return;
    await promiseWrapper({
      setLoading,
      callback: async () => {
        if (isValidForm()) {
          await callback(orderId, formData).then(closeModal);
          dispatch(
            addNotification({
              message: "Данные заказа обновлены",
              type: "success",
              field: "global",
            }),
          );
        }
      },
    });
  }, [
    type,
    orderId,
    formData,
    isValidForm,
    closeModal,
    orderOperationsMap,
    dispatch,
  ]);

  useEffect(() => {
    if (error) {
      isValidForm();
      dispatch(addNotification(error));
    }
  }, [error, isValidForm, dispatch]);

  return {
    onSubmit,
    onInputChange,
    formData,
    loading,
    error,
  };
};
