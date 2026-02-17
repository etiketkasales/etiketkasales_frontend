import RadioButton from "~/src/shared/ui/radio-button/ui";

interface Props {
  isActive: boolean;
  onClick: () => void;
}

export default function FilterRangeClear({ isActive, onClick }: Props) {
  return (
    <RadioButton
      isActive={isActive}
      onClick={onClick}
      className={`grid-column align-center gap-10px left-element`}
      classNameText="text-body l text-neutral-700"
      text="Не имеет значения"
    />
  );
}
