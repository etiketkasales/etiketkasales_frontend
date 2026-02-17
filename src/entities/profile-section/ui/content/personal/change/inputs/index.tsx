import classes from "./personal-inputs.module.scss";
import ProfileInputsSeparator from "~/src/entities/profile-section/ui/input-separator";
import { IChangeableProfile } from "~/src/features/user/model";
import { profilePersonalInputs } from "~/src/entities/profile-section/model";
import { MessageI } from "~/src/shared/model";

interface Props {
  onInputChange: (v: string, f: keyof IChangeableProfile) => void;
  changeableProfileData: IChangeableProfile;
  userPhone: string;
  enabledInputs: string[];
  enableInput: (field: keyof IChangeableProfile) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  error: MessageI | null;
}

export default function ProfilePersonalInputs({
  changeableProfileData,
  onInputChange,
  userPhone,
  onKeyDown,
  enableInput,
  enabledInputs,
  error,
}: Props) {
  return (
    <div className={classes.container}>
      {profilePersonalInputs.map((item, index) => (
        <ProfileInputsSeparator
          key={index + item.field}
          {...item}
          changeableProfileData={changeableProfileData}
          onInputChange={onInputChange}
          userPhone={userPhone}
          enabledInputs={enabledInputs}
          enableInput={enableInput}
          onKeyDown={onKeyDown}
          error={error}
        />
      ))}
    </div>
  );
}
