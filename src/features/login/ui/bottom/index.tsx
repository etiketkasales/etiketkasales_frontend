"use client";
import React from "react";
import Button from "~/src/shared/ui/button";

interface Props {
  handleButtonClick: () => Promise<void>;
  loading: boolean;
  buttonText: string;
}

export default function LoginBottom({
  handleButtonClick,
  loading,
  buttonText,
}: Props) {
  return (
    <Button
      typeButton="yellow"
      size="12"
      onClick={handleButtonClick}
      disabled={loading}
      radius={12}
    >
      <span className="black semibold text-16 second-family">{buttonText}</span>
    </Button>
  );
}
