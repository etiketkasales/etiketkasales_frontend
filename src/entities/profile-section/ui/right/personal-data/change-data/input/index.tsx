"use client";
import React from "react";

import classes from "./input.module.scss";
import TextInput from "~/src/shared/ui/inputs/text-input";
import PhoneInput from "~/src/shared/ui/inputs/phone";
import {
  IChangeUserData,
  ProfileInputI,
} from "~/src/entities/profile-section/model/profile.interface";
import { usePhoneInput } from "~/src/shared/ui/inputs/phone/hooks/usePhoneInput.hook";
import { IProfile } from "~/src/features/user/model/user.interface";

interface Props extends ProfileInputI {
  changeUserData: IChangeUserData;
  currentUserInfo: IProfile;
  handleChangeData: (v: string, field: keyof IChangeUserData) => void;
}

export default function ProfileChangeDataInput({
  type,
  holder,
  field,
  changeUserData,
  currentUserInfo,
  handleChangeData,
}: Props) {
  const { formatInput } = usePhoneInput();
  switch (type) {
    default:
    case "string":
      return (
        <TextInput
          classNameInput={`${classes.container} padding-20 bg-gray-container radius-12`}
          value={changeUserData[field].toString()}
          onChange={(v) => handleChangeData(v.target.value, field)}
          placeholder={
            currentUserInfo[field] ? currentUserInfo[field].toString() : holder
          }
        />
      );
    case "phone":
      return (
        <PhoneInput
          classNameInput={`${classes.container} padding-20 bg-gray-container radius-12`}
          value={changeUserData[field].toString()}
          onChange={(v) => handleChangeData(formatInput(v.target.value), field)}
          placeholder={
            currentUserInfo[field] ? currentUserInfo[field].toString() : holder
          }
        />
      );
  }
}
