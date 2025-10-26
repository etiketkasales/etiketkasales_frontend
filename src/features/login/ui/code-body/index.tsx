"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import classes from "./code-body.module.scss";
import TextInput from "~/src/shared/ui/inputs/text-input";
import TimerButton from "./timer-button";
import OtpInputCustom from "~/src/shared/ui/inputs/otp";

interface Props {
  phoneNumber: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  resendCode: () => Promise<void>;
  code: string;
}

export default function LoginCodeBody({
  phoneNumber,
  code,
  setCode,
  resendCode,
}: Props) {
  const { push } = useRouter();
  const [timer, setTimer] = useState<number>(30);

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (!phoneNumber) {
      push("/login");
    }
  }, [phoneNumber, push]);

  return (
    <>
      <p className="black text-16 semibold second-family">
        На номер {phoneNumber} отправлено сообщение
      </p>
      <OtpInputCustom
        value={code}
        numInputs={4}
        onChange={(e) => setCode(e)}
        classNameInput={`${classes.input} heading h5 text-neutral-1000`}
        classNameContainer={`flex-row gap-3`}
      />
      <TimerButton timer={timer} resendCode={resendCode} setTimer={setTimer} />
    </>
  );
}
