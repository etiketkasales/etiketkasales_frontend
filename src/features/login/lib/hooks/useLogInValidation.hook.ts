import { useCallback, useState } from "react";
import InputUtils from "~/src/shared/lib/utils/input.util";

import { MessageI } from "~/src/shared/model";

export const useLogInValidation = () => {
  const [message, setMessage] = useState<MessageI | null>(null);
  const hasPhoneError = useCallback((phone: string): boolean => {
    const isValidPhone = InputUtils.isPhoneLengthValid(phone);
    if (!isValidPhone) {
      setMessage({
        message: "Введите корректный номер",
        type: "error",
        field: "phone",
      });
      return true;
    }

    setMessage(null);
    return false;
  }, []);

  return {
    setMessage,
    message,
    hasPhoneError,
  };
};
