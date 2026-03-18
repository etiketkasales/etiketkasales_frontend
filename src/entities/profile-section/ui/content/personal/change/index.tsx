import ProfileSaveButton from "~/src/entities/profile-section/ui/save-button";
import ProfilePersonalInputs from "./inputs";
import { IChangeableProfile } from "~/src/features/user/model";
import { MessageI } from "~/src/shared/model";
import { IOnSaveChangesProps } from "~/src/entities/profile-section/model";

interface Props {
  changeableProfileData: IChangeableProfile;
  phone: string;
  onSave: (args: IOnSaveChangesProps) => void;
  isDisabled: boolean;
  onInputChange: (v: string, f: keyof IChangeableProfile) => void;
  enabledInputs: string[];
  enableInput: (field: keyof IChangeableProfile) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  error: MessageI | null;
}

export default function ProfileChange({
  changeableProfileData,
  phone,
  isDisabled,
  onSave,
  onInputChange,
  enabledInputs,
  enableInput,
  onKeyDown,
  error,
}: Props) {
  return (
    <>
      <ProfilePersonalInputs
        onInputChange={onInputChange}
        changeableProfileData={changeableProfileData}
        userPhone={phone}
        enabledInputs={enabledInputs}
        enableInput={enableInput}
        onKeyDown={onKeyDown}
        error={error}
      />
      <ProfileSaveButton disabled={isDisabled} onSave={onSave} />
    </>
  );
}
