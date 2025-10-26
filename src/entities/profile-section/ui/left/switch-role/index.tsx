"use client";
import React from "react";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectUser } from "~/src/app/store/reducers/user.slice";

import classes from "./switch-role.module.scss";
import Shop from "~/public/profile/shop-window.svg";
import Person from "~/public/profile/person.svg";
import ProfileWrapper from "~/src/entities/profile-section/ui/wrapper";

export default function ProfileSwitchRole() {
  const { currentRole } = useAppSelector(selectUser);

  return (
    <ProfileWrapper
      padding="16"
      className={`flex-column gap-3 align-center cursor ${classes.container}`}
    >
      {currentRole === "buyer" ? (
        <Shop style={{ maxWidth: "28px", maxHeight: "28px" }} />
      ) : (
        <Person style={{ maxWidth: "28px", maxHeight: "28px" }} />
      )}
      <p className="gray-2 text-16 semibold second-family">
        Войти как {currentRole === "buyer" ? "продавец" : "покупатель"}
      </p>
    </ProfileWrapper>
  );
}
