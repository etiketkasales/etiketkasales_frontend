"use client";
import React from "react";
import classNames from "classnames";
import { useSwitchRole } from "~/src/entities/profile-section/lib/hooks";

import classes from "./switch-role.module.scss";
import Shop from "~/public/profile/shop-window.svg";
import Person from "~/public/profile/person-fill.svg";
import ProfileContainer from "~/src/entities/profile-section/ui/container";
import LoaderCircle from "~/src/shared/ui/loader-circle";
import { UserRoleType } from "~/src/features/user/model";

interface Props {
  userRole: UserRoleType;
}

export default function ProfileSwitchRole({ userRole }: Props) {
  const { handleSwitchRole, loading } = useSwitchRole();
  return (
    <ProfileContainer
      as={"button"}
      className={classNames(
        `flex-column align-center pointer relative`,
        classes.container,
      )}
      bgColor="neutral-100"
      onClick={() =>
        handleSwitchRole(userRole === "buyer" ? "seller" : "buyer")
      }
    >
      {loading && <LoaderCircle radius={20} />}
      {userRole === "buyer" ? <Shop /> : <Person />}
      <p className="text-body xl text-neutral-800">
        {userRole === "buyer" ? "Войти как продавец" : "Войти как покупатель"}
      </p>
    </ProfileContainer>
  );
}
