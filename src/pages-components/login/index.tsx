"use client";
import React from "react";
import { redirect } from "next/navigation";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectNavigation } from "~/src/app/store/reducers/navigation.slice";
import { selectUser } from "~/src/app/store/reducers/user.slice";

import LoginMain from "~/src/features/login/ui";
import { selectLogIn } from "~/src/app/store/reducers/login.slice";

export default function LoginPage() {
  const { isLoggedIn, loadingData } = useAppSelector(selectUser);
  const { loaded } = useAppSelector(selectNavigation);
  const { forwardHref } = useAppSelector(selectLogIn);

  if (isLoggedIn && !loadingData && loaded) {
    if (forwardHref) return redirect(forwardHref);
    return redirect("/profile");
  }

  return <LoginMain />;
}
