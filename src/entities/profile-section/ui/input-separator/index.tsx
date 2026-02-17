import classNames from "classnames";

import classes from "./input.module.scss";
import RightIcon from "~/public/profile/pencil-square.svg";
import TextInput from "~/src/shared/ui/inputs/text-input";
import EmailInput from "~/src/shared/ui/inputs/email";
import ProfilePhone from "../content/personal/change/inputs/phone";
import { IChangeableProfile } from "~/src/features/user/model";
import { IProfileInput } from "~/src/entities/profile-section/model";
import { MessageI } from "~/src/shared/model";

interface Props extends IProfileInput {
  changeableProfileData: IChangeableProfile;
  userPhone?: string;
  onInputChange: (v: string, f: keyof IChangeableProfile) => void;
  enabledInputs: string[];
  enableInput: (field: keyof IChangeableProfile) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  error: MessageI | null;
  className?: string;
}

export default function ProfileInputsSeparator({
  field,
  holder,
  type,
  changeableProfileData,
  userPhone,
  onInputChange,
  enabledInputs,
  enableInput,
  onKeyDown,
  error,
  className,
}: Props) {
  if (field === "phone" || type === "phone") {
    return <ProfilePhone phone={userPhone || ""} />;
  }

  const disabled = !enabledInputs.includes(field);
  const commonProps = {
    value: changeableProfileData[field]
      ? changeableProfileData[field].toString()
      : "",
    placeholder: holder,
    separatedPlaceholder: true,
    separatedPlaceholderClassName: classNames(
      `text-body xs text-neutral-700 ${classes.holder}`,
      {
        [`${classes.active}`]: changeableProfileData[field],
      },
    ),
    inputClassName: `${classes.input} text-body l text-neutral-900`,
    wrapperClassName: classNames(classes.inputContainer, className),
    disabled,
    RightIcon: disabled ? RightIcon : undefined,
    onRightIconClick: () => enableInput(field),
    onKeyDown: onKeyDown,
  };

  switch (type) {
    default:
      return null;
    case "string":
      return (
        <TextInput
          {...commonProps}
          onChange={(e) => {
            onInputChange(e.target.value, field);
          }}
        />
      );
    case "email":
      return (
        <EmailInput
          {...commonProps}
          onChange={(e) => {
            onInputChange(e.target.value, field);
          }}
          errorText={error && error.field === field ? error.message : ""}
        />
      );
  }
}
