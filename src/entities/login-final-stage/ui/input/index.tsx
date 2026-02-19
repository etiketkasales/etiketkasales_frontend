import classes from "./inputs.module.scss";
import { ILoginFinalStageInput } from "../../model";
import { IChangeableProfile } from "~/src/features/user/model";
import { MessageI } from "~/src/shared/model";
import TextInput from "~/src/shared/ui/inputs/text-input";
import EmailInput from "~/src/shared/ui/inputs/email";

interface Props extends ILoginFinalStageInput {
  userInfo: IChangeableProfile;
  onChange: (v: string, f: keyof IChangeableProfile) => void;
  error: MessageI | null;
  loading: boolean;
}

export default function LoginFinalStageInput({
  onChange,
  error,
  loading,
  userInfo,
  type,
  placeholder,
  field,
}: Props) {
  const commonProps = {
    value: userInfo[field]?.toString() || "",
    placeholder,
    errorText: error?.field === field ? error.message : "",
    disabled: loading,
    name: `etiketka-${field}`,
  };

  switch (type) {
    default:
      return null;
    case "text":
      return (
        <TextInput
          {...commonProps}
          onChange={(e) => onChange(e.target.value, field)}
        />
      );
    case "email":
      return (
        <EmailInput
          {...commonProps}
          onChange={(e) => onChange(e.target.value, field)}
        />
      );
  }
}
