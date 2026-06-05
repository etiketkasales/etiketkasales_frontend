"use client";
import { redirect } from "next/navigation";

import { useAppSelector } from "~/src/app/store/hooks";
import { selectUser } from "~/src/app/store/reducers/user.slice";
import { selectNavigation } from "~/src/app/store/reducers/navigation.slice";
import Loader from "~/src/shared/ui/loader";

export default function ProfilePage() {
  const { isLoggedIn, loadingData, userInfo } = useAppSelector(selectUser);
  const { loaded } = useAppSelector(selectNavigation);

  if (loadingData || !loaded) {
    return <Loader radius={20} />;
  }

  if (!isLoggedIn) {
    redirect("/login");
  }

  if (
    userInfo.seller_status === "seller_pending" ||
    userInfo.company_verification_status === "pending"
  ) {
    redirect("/profile/seller-pending?active_section=quote");
  }

  redirect(`/profile/${userInfo.role ?? "buyer"}`);
}
