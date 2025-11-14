import { useCallback, useEffect, useState } from "react";
import FormUtils from "~/src/shared/lib/utils/form.util";

import { MessageI } from "~/src/shared/model";

interface Props<T extends Record<string, any>> {
  validateData: T;
  requiredFields: (keyof T)[];
  customErrorHandler?: () => keyof T;
}

export const useFormValidate = <T extends Record<string, any>>({
  validateData,
  requiredFields,
  customErrorHandler,
}: Props<T>) => {
  const [error, setError] = useState<MessageI | null>(null);
  const [hasValidateError, setHasValidateErrors] = useState<boolean>(false);

  // функция-помощник, выставляет стейт ошибки
  const setErrors = useCallback(
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

  // Функция для проверки заполняемости обязательных полей
  const hasEmptyError = useCallback((): boolean => {
    const newError = FormUtils.getFormError({
      requiredFields: requiredFields,
      checkData: validateData,
      currentError: error,
    });
    setError(newError);
    if (newError) {
      return true;
    }
    const customError = customErrorHandler?.();
    if (customError) {
      setError({
        field: customError.toString(),
        type: "error",
        message: "Поле обязтельно",
      });
      return true;
    }

    return false;
  }, [validateData, requiredFields, error, customErrorHandler]);

  // Функция для проверки ошибки валидации у полей, где она нужна (например, имейл)
  const handleHasValidateError = useCallback(
    (field: keyof T): boolean => {
      let newError: MessageI | null = null;
      if (!(field in validateData)) return false;

      if (String(field).includes("inn")) {
        newError = FormUtils.getINNError(validateData[field], String(field));
        return setErrors(newError, field);
      }

      if (String(field).includes("phone")) {
        newError = FormUtils.getPhoneError({
          phone: validateData[field],
          phoneField: String(field),
        });
        return setErrors(newError, field);
      }
      if (String(field).includes("email")) {
        newError = FormUtils.getEmailError({
          email: validateData[field],
          emailField: String(field),
        });
        return setErrors(newError, field);
      }
      return setErrors(newError, field);
    },
    [validateData, setErrors],
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
    hasEmptyError,
    handleHasValidateError,
  };
};
