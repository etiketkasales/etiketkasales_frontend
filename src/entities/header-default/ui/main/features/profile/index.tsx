"use client";
import React from "react";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectUser } from "~/src/app/store/reducers/user.slice";

import HeaderLogin from "./login";
import HeaderUser from "./user";

export default function HeaderProfile() {
  const { isLoggedIn } = useAppSelector(selectUser);

  if (isLoggedIn) return <HeaderUser />;

  return <HeaderLogin />;
}
