import { useCallback, useState } from "react";
import { useAppSelector } from "~/src/app/store/hooks";
import { useLogInEffects, useLogInValidation } from ".";

import { sendCode, verifyCode } from "~/src/features/login/lib/api/login.api";
import { selectLogIn } from "~/src/app/store/reducers/login.slice";
import { promiseWrapper } from "~/src/shared/lib";
import { formatPhoneForApi } from "~/src/shared/ui/inputs/phone/lib/utils";

interface Props {
  isCodePage: boolean;
}

export const useLogIn = ({ isCodePage }: Props) => {
  const { phoneNumber } = useAppSelector(selectLogIn);
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { message, setMessage, hasPhoneError } = useLogInValidation();
  const { sendPhoneEffect, sendCodeEffect } = useLogInEffects();

  const validatePhone = useCallback(() => {
    if (message !== null) {
      hasPhoneError(phoneNumber);
    }
  }, [message, phoneNumber, hasPhoneError]);

  const handleSendPhone = useCallback(async () => {
    return await promiseWrapper({
      setLoading,
      setError: setMessage,
      callback: async () => {
        if (hasPhoneError(phoneNumber)) return;
        const res = await sendCode(formatPhoneForApi(phoneNumber));
        if (res?.success) sendPhoneEffect(res?.message);
      },
    });
  }, [phoneNumber, hasPhoneError, sendPhoneEffect]);

  const handleSendCode = useCallback(
    async (codeParam?: string) => {
      return await promiseWrapper({
        setLoading,
        setError: setMessage,
        callback: async () => {
          if (hasPhoneError(phoneNumber)) return;
          const res = await verifyCode(
            formatPhoneForApi(phoneNumber),
            codeParam ?? code,
          );
          if (res && res.success) sendCodeEffect(res.message);
        },
      });
    },
    [code, phoneNumber, hasPhoneError, sendCodeEffect],
  );

  const handleSubmit = useCallback(
    async (codeParam?: string) =>
      await promiseWrapper({
        setLoading,
        setError: setMessage,
        callback: async () =>
          isCodePage ? handleSendCode(codeParam) : handleSendPhone(),
      }),
    [isCodePage, handleSendCode, handleSendPhone],
  );

  return {
    phone: phoneNumber,
    code,
    setCode,
    handleSendData: handleSubmit,
    handleSendPhone,
    validatePhone,
    message,
    loading,
  };
};
