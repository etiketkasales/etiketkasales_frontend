import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import { selectLogIn } from "~/src/app/store/reducers/login.slice";
import { useUser } from "~/src/features/user/lib/hooks/useUser.hook";
import { useCart } from "~/src/features/cart/lib/hooks/useCart.hook";
import { setUser } from "~/src/app/store/reducers/user.slice";
import { usePhoneInput } from "~/src/shared/ui/inputs/phone/hooks/usePhoneInput.hook";
import { sendCode, verifyCode } from "../api/login.api";
import InputUtils from "~/src/shared/lib/utils/input.util";

import { promiseWrapper } from "~/src/shared/lib/functions/shared.func";

import { MessageI } from "~/src/shared/model";

export const useLogIn = ({ isCodePage }: { isCodePage: boolean }) => {
  const dispatch = useAppDispatch();
  const { setUserData } = useUser();
  const { cartMerging } = useCart();
  const { push } = useRouter();
  const { phoneNumber } = useAppSelector(selectLogIn);
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<MessageI | null>(null);

  const { formatForApi } = usePhoneInput();

  const hasPhoneError = useCallback((phone: string): boolean => {
    return !InputUtils.isPhoneLengthValid(phone);
  }, []);

  const handleSendPhone = useCallback(async () => {
    await promiseWrapper({
      setLoading,
      setError: setMessage,
      callback: async () => {
        if (hasPhoneError(phoneNumber)) {
          setMessage({
            message: "Введите корректный номер",
            type: "error",
            field: "phone",
          });
          return;
        }
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
  }, [phoneNumber, formatForApi, hasPhoneError, push]);

  const handleSendCode = useCallback(
    async (codeParam?: string) => {
      return await promiseWrapper({
        setLoading,
        setError: setMessage,
        callback: async () => {
          if (hasPhoneError(phoneNumber)) {
            setMessage({
              message: "Введите корректный номер",
              type: "error",
              field: "phone",
            });
            return;
          }
          const res = await verifyCode(
            formatForApi(phoneNumber),
            codeParam ?? code,
          );
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
            await cartMerging();
            setUserData(res.user);
          }
        },
      });
    },
    [
      code,
      phoneNumber,
      formatForApi,
      hasPhoneError,
      dispatch,
      setUserData,
      cartMerging,
    ],
  );

  const promiseCallback = useCallback(
    async (codeParam?: string) => {
      if (isCodePage) {
        await handleSendCode(codeParam);
      } else {
        await handleSendPhone();
      }
    },
    [isCodePage, handleSendPhone, handleSendCode],
  );

  const handleSendData = useCallback(
    async (codeParam?: string) => {
      await promiseWrapper({
        setLoading,
        setError: setMessage,
        callback: async () => await promiseCallback(codeParam),
      });
    },
    [promiseCallback],
  );

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
