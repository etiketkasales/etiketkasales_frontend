"use client";
import { useEffect, useState } from "react";
import { useLogIn } from "../lib/hooks";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectNavigation } from "~/src/app/store/reducers/navigation.slice";
import { selectLogIn } from "~/src/app/store/reducers/login.slice";

import LoginMainBody from "./body";
import LoginWrapper from "./wrapper";
import LoginBottom from "./bottom";
import Loader from "~/src/shared/ui/loader";
import LoginCodeBody from "./code-body";

export default function LoginMain() {
  const { loaded } = useAppSelector(selectNavigation);
  const { phoneNumber } = useAppSelector(selectLogIn);
  const [isCodePage, setIsCodePage] = useState<boolean>(false);
  const { handleSendData, handleSendPhone, loading, message, code, setCode } =
    useLogIn({ isCodePage });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.pathname.includes("code")) {
      setIsCodePage(true);
    } else {
      setIsCodePage(false);
    }
  }, []);

  return (
    <LoginWrapper title={isCodePage ? "Введите код" : "Авторизация"}>
      {loading || (!loaded && <Loader radius={20} />)}
      {isCodePage ? (
        <LoginCodeBody
          code={code}
          setCode={setCode}
          phoneNumber={phoneNumber}
          resendCode={handleSendPhone}
          onComplete={handleSendData}
        />
      ) : (
        <LoginMainBody phone={phoneNumber} message={message} />
      )}
      <LoginBottom
        buttonText={isCodePage ? "Подтвердить" : "Продолжить"}
        handleButtonClick={handleSendData}
        loading={loading}
      />
    </LoginWrapper>
  );
}
