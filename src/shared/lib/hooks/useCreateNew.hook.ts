"use client";
import { useCallback, useState } from "react";
import { useFormValidate } from "./useFormValidate.hook";
import { promiseWrapper } from "../functions/shared.func";

interface Props<T extends Record<string, any>> {
  skeleton: T;
  customErrorHandler?: () => keyof T;
  requiredFields?: (keyof T)[];
}

export const useCreateNew = <T extends Record<string, any>>({
  skeleton,
  customErrorHandler,
  requiredFields,
}: Props<T>) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [newData, setNewData] = useState<T>(skeleton);
  const { error, hasEmptyError } = useFormValidate({
    validateData: newData,
    requiredFields: requiredFields ?? Object.keys(newData),
    customErrorHandler,
  });

  const hasErrors = useCallback((): boolean => {
    return hasEmptyError();
  }, [hasEmptyError]);

  const onChange = useCallback(
    (v: string, field: keyof T) => {
      setNewData({
        ...newData,
        [field]: v,
      });
    },
    [newData],
  );

  const onStringInputChange = useCallback(
    (v: string, field: keyof T) => onChange(v, field),
    [onChange],
  );

  const onNumberInputChange = useCallback(
    (v: string, field: keyof T) => {
      const numValue = Number(v);
      if (isNaN(numValue)) return;

      onChange(v, field);
    },
    [onChange],
  );

  const onSave = useCallback(
    async (callback: () => Promise<void>) => {
      await promiseWrapper({
        setLoading,
        callback: async () => {
          const isError = hasErrors();
          if (isError) return;
          await callback();
        },
      });
    },
    [hasErrors],
  );

  return {
    onStringInputChange,
    onNumberInputChange,
    newData,
    error,
    loading,
    onSave,
  };
};
