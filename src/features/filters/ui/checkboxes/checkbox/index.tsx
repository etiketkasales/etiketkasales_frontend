"use client";

import CheckboxInput from "~/src/shared/ui/inputs/checkbox";

interface Props {
  onClick: (v: string) => void;
  filterValue: string;
  isActiveFilter: boolean;
}

export default function FiltersCheckbox({
  onClick,
  filterValue,
  isActiveFilter,
}: Props) {
  return (
    <CheckboxInput
      onChange={() => onClick(filterValue)}
      checked={isActiveFilter}
      label={filterValue}
      classNameLabel="text-neutral-700 text-body l"
      gap="10px"
    />
  );
}
