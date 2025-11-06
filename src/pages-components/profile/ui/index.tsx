"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectUser } from "~/src/app/store/reducers/user.slice";
import { useUser } from "~/src/features/user/lib/hooks/useUser.hook";
import { selectNavigation } from "~/src/app/store/reducers/navigation.slice";

export default function ProfilePage() {
  const { handleGetUser } = useUser();
  const { currentRole, isLoggedIn, loadingData } = useAppSelector(selectUser);
  const { loaded } = useAppSelector(selectNavigation);

  useEffect(() => {
    handleGetUser();
  }, [handleGetUser]);

  if (!isLoggedIn && !loadingData && loaded) redirect("/login");

  return redirect(`/profile/${currentRole}`);
}
