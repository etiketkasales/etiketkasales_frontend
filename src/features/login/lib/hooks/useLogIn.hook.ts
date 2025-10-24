import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectLogIn } from "~/src/app/store/reducers/login.slice";
import { usePhoneInput } from "~/src/shared/ui/inputs/phone/hooks/usePhoneInput.hook";
import { sendCode, verifyCode } from "../api/login.api";
import InputUtils from "~/src/shared/lib/utils/input.util";

import { promiseWrapper } from "~/src/shared/lib/functions/shared.func";

import { MessageI } from "~/src/shared/model";

export const useLogIn = ({ isCodePage }: { isCodePage: boolean }) => {
  const { push } = useRouter();
  const { phoneNumber } = useAppSelector(selectLogIn);
  const [code, setCode] = useState<string>("");
  const [needRemember, setNeedRemember] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<MessageI | null>(null);

  const { formatForApi } = usePhoneInput();

  const checkPhone = (phone: string) => {
    if (!InputUtils.isPhoneLengthValid(phone)) {
      setMessage({
        message: "Введите корректный номер",
        type: "error",
      });
      return;
    }
  };

  const handleSendPhone = useCallback(async () => {
    await promiseWrapper({
      setLoading,
      setError: setMessage,
      callback: async () => {
        checkPhone(phoneNumber);
        const res = await sendCode(formatForApi(phoneNumber));
        setMessage({
          type: "success",
          message: res?.message || "Код отправлен",
        });
      },
    });
  }, [phoneNumber, formatForApi]);

  const handleSendCode = useCallback(async () => {
    await promiseWrapper({
      setLoading,
      setError: setMessage,
      callback: async () => {
        checkPhone(phoneNumber);
        const res = await verifyCode(formatForApi(phoneNumber), code);
        setMessage({
          type: "success",
          message: res?.message || "Код отправлен",
        });
      },
    });
  }, [code, phoneNumber, formatForApi]);

  const promiseCallback = useCallback(async () => {
    if (isCodePage) {
      await handleSendCode();
      push("/");
    } else {
      await handleSendPhone();
      push("/login/code");
    }
    setMessage(null);
  }, [isCodePage, handleSendPhone, push]);

  const handleSendData = async () => {
    await promiseWrapper({
      setLoading,
      setError: setMessage,
      callback: promiseCallback,
    });
  };

  useEffect(() => {
    if (message) {
      if (InputUtils.isPhoneLengthValid(phoneNumber)) {
        setMessage(null);
      }
    }
  }, [phoneNumber, message]);

  return {
    phone: phoneNumber,
    code,
    setCode,
    needRemember,
    setNeedRemember,
    handleSendData,
    handleSendPhone,
    message,
    loading,
  };
};
