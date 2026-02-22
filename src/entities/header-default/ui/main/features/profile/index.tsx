"use client";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectUser } from "~/src/app/store/reducers/user.slice";
import { selectNavigation } from "~/src/app/store/reducers/navigation.slice";

import HeaderLogin from "./login";
import HeaderUser from "./user";

export default function HeaderProfile() {
  const { loaded } = useAppSelector(selectNavigation);
  const { isLoggedIn, loadingData } = useAppSelector(selectUser);

  if (isLoggedIn && !loadingData && loaded) return <HeaderUser />;

  return <HeaderLogin loading={loadingData} />;
}
