"use client";
import React from "react";
import { useAppDispatch } from "~/src/app/store/hooks";
import { setPhoneNumber } from "~/src/app/store/reducers/login.slice";

import classes from "./body.module.scss";
import PhoneInput from "~/src/shared/ui/inputs/phone";
import NeedRememberCheckbox from "./need-remember";
import { MessageI } from "~/src/shared/model";

interface Props {
  phone: string;
  message: MessageI | null;
}

export default function LoginMainBody({ phone, message }: Props) {
  const dispatch = useAppDispatch();
  return (
    <>
      <div className="flex-column">
        <PhoneInput
          placeholder="Номер телефона"
          name="etiketka-phone"
          onChange={(e) => {
            dispatch(setPhoneNumber(e));
          }}
          value={phone}
          onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
          inputClassName={`${classes.input} ${message && classes.error}`}
        />
        {message && <p className="red text-14 regular">{message.message}</p>}
      </div>
      <NeedRememberCheckbox />
    </>
  );
}
