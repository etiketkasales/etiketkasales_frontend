"use client";
import React from "react";
import Button from "~/src/shared/ui/button";

interface Props {
  buttonClick: () => Promise<void>;
}

export default function ProfileChangeButton({ buttonClick }: Props) {
  return (
    <div>
      <Button
        typeButton="yellow"
        size="16-24"
        onClick={buttonClick}
        radius={12}
      >
        <span className="text-16 black semibold second-family">Сохранить</span>
      </Button>
    </div>
  );
}
