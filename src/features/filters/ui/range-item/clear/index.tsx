import React, { Dispatch, SetStateAction } from "react";

import RadioButton from "~/src/shared/ui/radio-button/ui";

interface Props {
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
}

export default function FilterRangeClear({ isActive, setIsActive }: Props) {
  return (
    <RadioButton
      isActive={isActive}
      onClick={() => {
        setIsActive(true);
      }}
      className={`flex-row align-center gap-10px`}
      classNameText="text-body l text-neutral-700"
    />
  );
}
