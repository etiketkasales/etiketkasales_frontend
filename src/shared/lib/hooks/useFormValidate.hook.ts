import { useCallback, useEffect, useState } from "react";
import FormUtils from "~/src/shared/lib/utils/form.util";

import { MessageI } from "~/src/shared/model/shared.interface";

interface Props<T extends Record<string, any>> {
  validateData: T;
  requiredFields: (keyof T)[];
}

export const useFormValidate = <T extends Record<string, any>>({
  validateData,
  requiredFields,
}: Props<T>) => {
  const [error, setError] = useState<MessageI | null>(null);
  const [hasValidateError, setHasValidateErrors] = useState<boolean>(false);

  const handleSetErrors = useCallback(
    (newError: MessageI | null, field: keyof T): boolean => {
      if (newError) {
        setError(newError);
        setHasValidateErrors(true);
        return true;
      }
      if (error?.field === field) {
        setHasValidateErrors(false);
        setError(null);
      }
      return false;
    },
    [error?.field],
  );

  const handleIsError = useCallback((): boolean => {
    const newError = FormUtils.getFormError({
      requiredFields: requiredFields,
      checkData: validateData,
      currentError: error,
    });
    setError(newError);
    if (newError) {
      return true;
    }
    return false;
  }, [validateData, requiredFields, error]);

  const handleHasValidateError = useCallback(
    (field: keyof T): boolean => {
      let newError: MessageI | null = null;

      if (!(field in validateData)) return false;

      if (String(field).includes("phone")) {
        newError = FormUtils.getPhoneError({
          phone: validateData[field],
          phoneField: String(field),
        });
        return handleSetErrors(newError, field);
      }
      if (String(field).includes("email")) {
        newError = FormUtils.getEmailError({
          email: validateData[field],
          emailField: String(field),
        });
        return handleSetErrors(newError, field);
      }
      return handleSetErrors(newError, field);
    },
    [validateData, handleSetErrors],
  );

  useEffect(() => {
    if (!error) return;
    const value = validateData[error.field as keyof T];
    if (!FormUtils.checkIfValueEmpty(value) && !hasValidateError) {
      setError(null);
    }
  }, [error, validateData, hasValidateError]);

  return {
    error,
    hasValidateError,
    handleIsError,
    handleHasValidateError,
  };
};
