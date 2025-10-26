import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import { selectLogIn } from "~/src/app/store/reducers/login.slice";
import { setUser } from "~/src/app/store/reducers/user.slice";
import { usePhoneInput } from "~/src/shared/ui/inputs/phone/hooks/usePhoneInput.hook";
import { sendCode, verifyCode } from "../api/login.api";
import InputUtils from "~/src/shared/lib/utils/input.util";

import { promiseWrapper } from "~/src/shared/lib/functions/shared.func";

import { MessageI } from "~/src/shared/model";

export const useLogIn = ({ isCodePage }: { isCodePage: boolean }) => {
  const dispatch = useAppDispatch();
  const { push } = useRouter();
  const { phoneNumber, prevHref } = useAppSelector(selectLogIn);
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<MessageI | null>(null);

  const { formatForApi } = usePhoneInput();

  const checkPhone = useCallback(
    (phone: string) => {
      if (!InputUtils.isPhoneLengthValid(phone)) {
        setMessage({
          message: "Введите корректный номер",
          type: "error",
        });
        return;
      }
    },
    [setMessage],
  );

  const handleSendPhone = useCallback(async () => {
    await promiseWrapper({
      setLoading,
      setError: setMessage,
      callback: async () => {
        checkPhone(phoneNumber);
        const res = await sendCode(formatForApi(phoneNumber));
        if (res?.success) {
          setMessage({
            type: "success",
            message: res?.message || "Код отправлен",
          });
          push("/login/code");
        }
      },
    });
  }, [phoneNumber, formatForApi, checkPhone, push]);

  const handleSendCode = useCallback(async () => {
    return await promiseWrapper({
      setLoading,
      setError: setMessage,
      callback: async () => {
        checkPhone(phoneNumber);
        const res = await verifyCode(formatForApi(phoneNumber), code);
        setMessage({
          type: "success",
          message: res?.message || "Вход успешен",
        });
        if (res && res.success) {
          dispatch(
            setUser({
              isLoggedIn: true,
            }),
          );
          push(prevHref);
        }
      },
    });
  }, [code, phoneNumber, formatForApi, checkPhone, push, dispatch, prevHref]);

  const promiseCallback = useCallback(async () => {
    if (isCodePage) {
      await handleSendCode();
    } else {
      await handleSendPhone();
    }
    setMessage(null);
  }, [isCodePage, handleSendPhone, handleSendCode]);

  const handleSendData = useCallback(async () => {
    await promiseWrapper({
      setLoading,
      setError: setMessage,
      callback: promiseCallback,
    });
  }, [promiseCallback]);

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
    handleSendData,
    handleSendPhone,
    message,
    loading,
  };
};
