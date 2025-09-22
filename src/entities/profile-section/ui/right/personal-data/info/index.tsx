"use client";
import React from "react";

import classes from "./info.module.scss";
import UserImage from "~/src/shared/ui/user-image";

interface Props {
  id: number;
  avatar: string;
  registration_date: string;
  name: string;
  second_name: string;
}

export default function ProfilePersonalInfo({
  id,
  name,
  second_name,
  registration_date,
  avatar,
}: Props) {
  return (
    <div className={`flex-row gap-6 align-center ${classes.container}`}>
      <UserImage src={avatar} width={80} height={80} />
      <div className="flex-column gap-2 flex-start">
        <p className="black text-18 semibold second-family">
          {!name && !second_name ? `User-${id}` : `${name} ${second_name}`}
        </p>
        <p className="gray-2 text-16 regular second-family">
          Дата регистрации: {registration_date}
        </p>
      </div>
    </div>
  );
}
