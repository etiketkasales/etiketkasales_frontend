"use client";
import React from "react";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectUser } from "~/src/app/store/reducers/user.slice";

import HeaderLogin from "./login";
import HeaderUser from "./user";
import { selectNavigation } from "~/src/app/store/reducers/navigation.slice";

export default function HeaderProfile() {
  const { loaded } = useAppSelector(selectNavigation);
  const { isLoggedIn, loadingData } = useAppSelector(selectUser);

  if (isLoggedIn && !loadingData && loaded) return <HeaderUser />;

  return <HeaderLogin />;
}
