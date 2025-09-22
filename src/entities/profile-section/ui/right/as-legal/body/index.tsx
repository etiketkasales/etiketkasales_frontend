"use client";
import React from "react";

import classes from "./body.module.scss";
import ProfileAsLegalEntity from "./entity";
import { ProfileLegalEntityI } from "~/src/entities/profile-section/model/profile.interface";

interface Props {
  legalEntity?: ProfileLegalEntityI;
}

export default function ProfileAsLegalBody({ legalEntity }: Props) {
  if (!legalEntity)
    return (
      <div className={`place-center ${classes.no_data}`}>
        <p className="text-20 second-family gray-2 regular text-cente">
          Организация не добавлена
        </p>
      </div>
    );
  return <ProfileAsLegalEntity entity={legalEntity} />;
}
