import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import { selectLogIn } from "~/src/app/store/reducers/login.slice";
import { useUser } from "~/src/features/user/lib/hooks/useUser.hook";
import { useCart } from "~/src/features/cart/lib/hooks/useCart.hook";
import { setUser } from "~/src/app/store/reducers/user.slice";
import { usePhoneInput } from "~/src/shared/ui/inputs/phone/hooks/usePhoneInput.hook";
import { addNotification } from "~/src/app/store/reducers/notifications.slice";
import { sendCode, verifyCode } from "../api/login.api";
import InputUtils from "~/src/shared/lib/utils/input.util";
import { promiseWrapper } from "~/src/shared/lib";

import { MessageI } from "~/src/shared/model";

//Раздутый хук. TODO: рефактор этого хука

/**
 * useLogIn - хук для логина на странице входа
 * @param {Object} options - объект с параметрами
 * @param {boolean} options.isCodePage - флаг, указывающий, является ли страница страницей кода
 * @returns {Object} - объект с параметрами, которые возвращаются из хука
 * @property {string} phone - номер телефона, который отправлен на сервер
 * @property {string} code - код, который отправлен на сервер
 * @property {function} setCode - функция для смены кода
 * @property {function} handleSendData - функция для отправки данных на сервер
 * @property {function} handleSendPhone - функция для отправки номера телефона на сервер
 * @property {MessageI | null} message - сообщение об ошибке
 * @property {boolean} loading - флаг, указывающий, загружка ли страница
 */
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
          dispatch(
            addNotification({
              type: "success",
              message: res?.message || "Код отправлен",
              field: "global",
            }),
          );
          push("/login/code");
        }
      },
    });
  }, [phoneNumber, formatForApi, hasPhoneError, push, dispatch]);

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
          if (res && res.success) {
            dispatch(
              setUser({
                isLoggedIn: true,
              }),
            );
            dispatch(
              addNotification({
                type: "success",
                message: res?.message || "Вы вошли в систему",
                field: "global",
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
      dispatch(addNotification(message));
      if (InputUtils.isPhoneLengthValid(phoneNumber)) {
        setMessage(null);
      }
    }
  }, [phoneNumber, message, dispatch]);

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
