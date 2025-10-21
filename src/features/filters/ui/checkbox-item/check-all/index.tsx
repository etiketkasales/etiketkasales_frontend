import React from "react";

import CheckboxInput from "~/src/shared/ui/inputs/checkbox";

interface Props {
  checked: boolean;
  onChange: () => void;
}

export default function FiltersCheckAll({ checked, onChange }: Props) {
  return (
    <CheckboxInput
      onChange={() => {
        if (!checked) {
          onChange();
        }
      }}
      checked={checked}
      label={"Все"}
      classNameLabel="text-neutral-700 text-body l"
      gap="10px"
    />
  );
}
