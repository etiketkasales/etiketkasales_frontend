import CheckboxInput from "~/src/shared/ui/inputs/checkbox";
import LinkContainer from "~/src/shared/ui/link-container/ui";

interface Props {
  checked: boolean;
  onChange: (e: boolean) => void;
  error: boolean;
}

export default function AddCompanyCheckBox({
  checked,
  onChange,
  error,
}: Props) {
  return (
    <CheckboxInput
      checked={checked}
      onChange={onChange}
      gap={"10px"}
      error={error}
      name="agreement"
      nodeLabel={
        <span className="text-body l text-neutral-700">
          Я принимаю{" "}
          <LinkContainer link="/personal-policy" className="blue-link">
            Условия обработки персональных данных
          </LinkContainer>
        </span>
      }
    />
  );
}
