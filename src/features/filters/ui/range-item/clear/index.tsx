import React from "react";

import RadioButton from "~/src/shared/ui/radio-button/ui";

interface Props {
  isActive: boolean;
  onClick: () => void;
}

export default function FilterRangeClear({ isActive, onClick }: Props) {
  return (
    <RadioButton
      isActive={isActive}
      onClick={() => {
        if (!isActive) {
          onClick();
        }
      }}
      className={`flex-row align-center gap-10px`}
      classNameText="text-body l text-neutral-700"
      text="Не имеет значения"
    />
  );
}
