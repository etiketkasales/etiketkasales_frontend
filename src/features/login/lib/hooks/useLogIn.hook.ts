import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import { selectLogIn } from "~/src/app/store/reducers/login.slice";
import { usePhoneInput } from "~/src/shared/ui/inputs/phone/hooks/usePhoneInput.hook";

import { promiseWrapper } from "~/src/shared/lib/functions/shared.func";
import { sendCode, sendPhone } from "~/src/features/login/lib/api/login.api";

import { MessageI } from "~/src/shared/model/shared.interface";
import InputUtils from "~/src/shared/lib/utils/input.util";
import { setUser } from "~/src/app/store/reducers/user.slice";

export const useLogIn = ({ isCodePage }: { isCodePage: boolean }) => {
  const dispatch = useAppDispatch();
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

  const handleSendPhone = async () => {
    await promiseWrapper({
      setLoading,
      setError: setMessage,
      callback: async () => {
        checkPhone(phoneNumber);
        await sendPhone(formatForApi(phoneNumber), needRemember);
        setMessage(null);
      },
    });
  };

  const promiseCallback = async () => {
    if (isCodePage) {
      const response = await sendCode(code, formatForApi(phoneNumber));
      if (response.user_id) {
        dispatch(setUser({ userId: response.user_id }));
        push("/profile");
      }
    } else {
      await handleSendPhone();
      push("/login/code");
    }
    setMessage(null);
  };

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
