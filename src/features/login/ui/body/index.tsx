"use client";
import React from "react";
import { useAppDispatch } from "~/src/app/store/hooks";
import { setPhoneNumber } from "~/src/app/store/reducers/login.slice";
import { usePhoneInput } from "~/src/shared/ui/inputs/phone/hooks/usePhoneInput.hook";

import classes from "./body.module.scss";
import PhoneInput from "~/src/shared/ui/inputs/phone";
import CheckboxInput from "~/src/shared/ui/inputs/checkbox";
import { MessageI } from "~/src/shared/model/shared.interface";

interface Props {
  phone: string;
  setNeedRemember: React.Dispatch<React.SetStateAction<boolean>>;
  needRemember: boolean;
  message: MessageI | null;
}

export default function LoginMainBody({
  phone,
  setNeedRemember,
  needRemember,
  message,
}: Props) {
  const { formatInput } = usePhoneInput();
  const dispatch = useAppDispatch();
  return (
    <>
      <div className="flex-column">
        <PhoneInput
          placeholder="Номер телефона"
          name="etiketka-phone"
          onChange={(e) => {
            dispatch(setPhoneNumber(formatInput(e.target.value)));
          }}
          value={phone}
          onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
          classNameInput={`padding-14 bg-gray-container padding-14-16 radius-12 ${classes.input} ${message && classes.error}`}
        />
        {message && <p className="red text-14 regular">{message.message}</p>}
      </div>
      <CheckboxInput
        checked={needRemember}
        onChange={() => {
          setNeedRemember(!needRemember);
        }}
        label="Запомнить меня"
        gap="10px"
      />
    </>
  );
}
