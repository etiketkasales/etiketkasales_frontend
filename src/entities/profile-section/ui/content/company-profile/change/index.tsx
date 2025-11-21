import React from "react";

import classes from "./company-change.module.scss";
import ProfileInputsSeparator from "~/src/entities/profile-section/ui/input-separator";
import ProfileSaveButton from "~/src/entities/profile-section/ui/save-button";
import { IChangeableProfile } from "~/src/features/user/model";
import { MessageI } from "~/src/shared/model";

interface Props {
  onSave: () => void;
  changeableProfileData: IChangeableProfile;
  enabledInputs: string[];
  onInputChange: (v: string, f: keyof IChangeableProfile) => void;
  error: MessageI | null;
  disabledButton: boolean;
  enableInput: (field: keyof IChangeableProfile) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  loading: boolean;
}

export default function CompanyProfileChange({
  onSave,
  changeableProfileData,
  enabledInputs,
  onInputChange,
  error,
  disabledButton,
  enableInput,
  onKeyDown,
  loading,
}: Props) {
  return (
    <>
      <ProfileInputsSeparator
        type="string"
        field="shop_name"
        onInputChange={(e) => onInputChange(e, "shop_name")}
        changeableProfileData={changeableProfileData}
        enabledInputs={enabledInputs}
        enableInput={() => enableInput("shop_name")}
        holder="Название магазина"
        error={error}
        onKeyDown={onKeyDown}
        className={classes.input}
      />
      <ProfileSaveButton disabled={disabledButton || loading} onSave={onSave} />
    </>
  );
}
