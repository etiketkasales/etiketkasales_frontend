"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import classes from "./code-body.module.scss";
import TextInput from "~/src/shared/ui/inputs/text-input";
import TimerButton from "./timer-button";

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
  }, []);

  return (
    <>
      <p className="black text-16 semibold second-family">
        На номер {phoneNumber} отправлено сообщение
      </p>
      <TextInput
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Код подтверждения"
        onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
        classNameInput={`${classes.input} padding-14-16 bg-gray-container radius-12`}
        className={classes.input_container}
      />
      <TimerButton timer={timer} resendCode={resendCode} />
    </>
  );
}
