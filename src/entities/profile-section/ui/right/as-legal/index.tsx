"use client";
import React from "react";

import classes from "./as-legal.module.scss";
import ProfileAsLegalHeading from "./heading";
import ProfileAsLegalBody from "./body";
import { profileLegalEntity } from "~/src/entities/profile-section/model/profile.const";

export default function ProfileAsLegal() {
  return (
    <div className={`flex-column gap-8 ${classes.container}`}>
      <ProfileAsLegalHeading />
      <ProfileAsLegalBody legalEntity={profileLegalEntity} />
    </div>
  );
}
