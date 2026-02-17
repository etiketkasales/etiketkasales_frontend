"use client";

import Button from "~/src/shared/ui/button";

interface Props {
  timer: number;
  resendCode: () => Promise<void>;
  setTimer: React.Dispatch<React.SetStateAction<number>>;
}

export default function TimerButton({ timer, resendCode, setTimer }: Props) {
  if (!timer) {
    return (
      <Button
        typeButton="ghost"
        size="0"
        onClick={() => {
          resendCode();
          setTimer(30);
        }}
        justifyCenter={false}
      >
        <span className="yellow text-16 regular second-family text-left">
          Отправить код повторно
        </span>
      </Button>
    );
  }

  return (
    <p className="gray-2 text-16 regular second-family">
      Отправить код повторно через {timer} сек.
    </p>
  );
}
