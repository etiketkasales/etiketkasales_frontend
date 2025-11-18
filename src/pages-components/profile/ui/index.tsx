"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectUser } from "~/src/app/store/reducers/user.slice";
import { useUser } from "~/src/features/user/lib/hooks/useUser.hook";
import { selectNavigation } from "~/src/app/store/reducers/navigation.slice";

export default function ProfilePage() {
  const { handleGetUser } = useUser();
  const { currentRole, isLoggedIn, loadingData, userInfo } =
    useAppSelector(selectUser);
  const { loaded } = useAppSelector(selectNavigation);

  useEffect(() => {
    handleGetUser();
  }, [handleGetUser]);

  if (!loadingData && loaded) {
    if (!isLoggedIn) {
      redirect("/login");
    }
    if (userInfo.seller_status === "pending") {
      redirect("/profile/seller-pending");
    }
  }

  return redirect(`/profile/${currentRole}`);
}
