"use client";
import React from "react";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { useSwitchRole } from "~/src/entities/profile-section/lib/hooks";

import classes from "./switch-role.module.scss";
import Shop from "~/public/profile/shop-window.svg";
import Person from "~/public/profile/person-fill.svg";
import ProfileContainer from "~/src/entities/profile-section/ui/container";
import Loader from "~/src/shared/ui/loader";
import { UserRoleType } from "~/src/features/user/model";

interface Props {
  userRole: UserRoleType | "seller-pending";
}

export default function ProfileSwitchRole({ userRole }: Props) {
  const { push } = useRouter();
  const { handleSwitchRole, loading } = useSwitchRole();
  return (
    <ProfileContainer
      as={"button"}
      className={classNames(
        `flex-column align-center pointer relative`,
        classes.container,
      )}
      bgColor="neutral-100"
      onClick={() => {
        if (userRole === "seller-pending") {
          push("/profile/buyer");
        } else {
          handleSwitchRole(userRole === "buyer" ? "seller" : "buyer");
        }
      }}
    >
      {loading && <Loader radius={20} />}
      {userRole === "buyer" ? <Shop /> : <Person />}
      <p className="text-body xl text-neutral-800">
        {userRole === "buyer" ? "Войти как продавец" : "Войти как покупатель"}
      </p>
    </ProfileContainer>
  );
}
