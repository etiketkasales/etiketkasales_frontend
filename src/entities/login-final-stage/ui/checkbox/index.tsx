import { MessageI } from "~/src/shared/model";
import CheckboxInput from "~/src/shared/ui/inputs/checkbox";
import LinkContainer from "~/src/shared/ui/link-container/ui";

interface Props {
  onChange: (c: boolean) => void;
  checked: boolean;
  error: MessageI | null;
}

export default function LoginFinalStageCheckbox({
  onChange,
  checked,
  error,
}: Props) {
  return (
    <CheckboxInput
      onChange={onChange}
      checked={checked}
      name="accept_agreement"
      error={error?.field === "agreement"}
      gap={"10px"}
      nodeLabel={
        <span className="text-body l text-neutral-700">
          Я принимаю{" "}
          <LinkContainer link="/personal-policy" className="blue-link">
            Условия обработки персональных данных
          </LinkContainer>
          , а также{" "}
          <LinkContainer link="payment-info" className="blue-link">
            Оферту
          </LinkContainer>
        </span>
      }
    />
  );
}
