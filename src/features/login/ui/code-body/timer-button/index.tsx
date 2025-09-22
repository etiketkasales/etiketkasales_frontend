"use client";
import React from "react";
import Button from "~/src/shared/ui/button";

interface Props {
  timer: number;
  resendCode: () => Promise<void>;
}

export default function TimerButton({ timer, resendCode }: Props) {
  if (!timer) {
    return (
      <Button
        typeButton="ghost"
        size="0"
        onClick={resendCode}
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
